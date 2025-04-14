import type {
	CreateRespuestas,
	EditUsuario,
	LoginUsuario,
	Respuestas,
	SignupUsuario,
	Usuario,
} from "@monorepo/server/db"

import { queryOptions } from "@tanstack/react-query"
import SuperJSON from "superjson"

import { env } from "@/client/t3-env"

import hcClient from "./api"
import { checkAccessTokenExpired, getAccessToken, TIMER } from "./api-utils"

export const client = hcClient(env.VITE_API_URL, {
	fetch: (input: URL | RequestInfo, requestInit: RequestInit | undefined) => {
		return fetch(input, {
			...requestInit,
			credentials: "include",
		})
	},
})

async function fetchWithAuth() {
	let token = getAccessToken()
	if (!token) {
		throw new Error("Usuario no autenticado")
	}

	if (checkAccessTokenExpired(token)) {
		try {
			await refreshAccessToken()
			token = getAccessToken()
		} catch (_err) {
			localStorage.removeItem("access_token")
			window.location.href = "/login"
			return
		}
	}

	return token
}

async function checkRateLimit(status: number) {
	if (status === 429) {
		await logout()

		return (window.location.href = "/login")
	}
}

export async function login({ email, password }: LoginUsuario) {
	return await client.api.login
		.$post({
			json: { email, password },
		})
		.then(async (res) => {
			const json = await res.json()

			if (!res.ok && "status" in json && "message" in json) {
				await checkRateLimit(json.status as number)

				throw new Error(json.message as string)
			}

			return json.access_token
		})
}

export async function signup({ email, password, repeat_password }: SignupUsuario) {
	return await client.api.signup
		.$post({
			json: { email, password, repeat_password },
		})
		.then(async (res) => {
			const json = await res.json()

			if (!res.ok && "status" in json && "message" in json) {
				await checkRateLimit(json.status as number)

				throw new Error(json.message as string)
			}
		})
}

export async function logout(): Promise<{ status: string }> {
	return fetchWithAuth().then((token) =>
		client.api.logout
			.$post({}, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return json
			}),
	)
}

export async function forgotPassword(email: string) {
	return client.api.password.forgot.$post({ json: { email } }).then(async (res) => {
		const json = await res.json()

		if (!res.ok && "status" in json && "message" in json) {
			await checkRateLimit(json.status as unknown as number)

			throw new Error(json.message as string)
		}
	})
}

type ResetPassword = {
	password: string
	repeat_password: string
	token: string
}

export async function resetPassword({ password, repeat_password, token }: ResetPassword) {
	return client.api.password.reset[":token"]
		.$post({ json: { password, repeat_password }, param: { token } })
		.then(async (res) => {
			const json = await res.json()

			if (!res.ok && "status" in json && "message" in json) {
				await checkRateLimit(json.status as unknown as number)

				throw new Error(json.message as string)
			}
		})
}

type ChangePassword = {
	password: string
	new_password: string
	repeat_new_password: string
}

export async function changePassword(data: ChangePassword) {
	return fetchWithAuth().then((token) =>
		client.api.password.change
			.$put({ json: data }, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return json
			}),
	)
}

export async function deleteUsuario() {
	return fetchWithAuth().then((token) =>
		client.api.usuario.delete
			.$delete({}, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return json
			}),
	)
}

async function refreshAccessToken() {
	return await client.api.refresh.$post().then(async (res) => {
		const json = await res.json()

		if (!res.ok && "status" in json && "message" in json) {
			throw new Error(json.message as string)
		}

		localStorage.setItem("access_token", json.access_token)
	})
}

export type AuthUsuario = {
	id: string
	roles: ("super_admin" | "admin" | "user")[]
}

export async function getAuthMe(): Promise<{ usuario: AuthUsuario }> {
	const token = getAccessToken()
	if (!token) {
		throw new Error("Usuario no autenticado")
	}

	return await client.api.auth
		.$get({}, { headers: { Authorization: `Bearer ${token}` } })
		.then(async (res) => {
			const json = await res.json()

			if (!res.ok && "status" in json && "message" in json) {
				if (json.status === 401) {
					await refreshAccessToken()

					return getAuthMe()
				}

				throw new Error(json.message as string)
			}

			return json
		})
}

export const authMeQueryOptions = () => {
	return queryOptions({
		queryKey: ["auth"],
		queryFn: getAuthMe,
		staleTime: TIMER,
	})
}

export async function getMe(): Promise<Usuario | null> {
	return fetchWithAuth().then((token) =>
		client.api.usuario
			.$get({}, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as number)

					throw new Error(json.message as string)
				}

				return SuperJSON.parse(json.usuario)
			}),
	)
}

export const meQueryOptions = (id: string | undefined) => {
	return queryOptions({
		queryKey: ["usuario", id],
		queryFn: getMe,
		enabled: !!id,
		staleTime: Infinity,
		throwOnError: true,
	})
}

export async function editMe(data: EditUsuario): Promise<string | null> {
	return fetchWithAuth().then((token) =>
		client.api.usuario.edit
			.$put({ form: data }, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return json.status
			}),
	)
}

export async function saveRespuestas(respuestas: CreateRespuestas): Promise<Respuestas> {
	return fetchWithAuth().then((token) =>
		client.api.respuestas
			.$post(
				{
					json: respuestas,
				},
				{ headers: { Authorization: `Bearer ${token}` } },
			)
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return SuperJSON.parse(json.respuesta)
			}),
	)
}

export async function getRespuestas(): Promise<Respuestas[] | null> {
	return fetchWithAuth().then((token) =>
		client.api.respuestas
			.$get({}, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return SuperJSON.parse(json.respuestas)
			}),
	)
}

export const getRespuestasOptions = (usuarioId: string | undefined) => {
	return queryOptions({
		queryKey: ["resultados", usuarioId],
		queryFn: getRespuestas,
		enabled: !!usuarioId,
		staleTime: Infinity,
		throwOnError: true,
	})
}

export async function getRespuestaById(respuestaId: string): Promise<Respuestas | null> {
	return fetchWithAuth().then((token) =>
		client.api.respuestas[":id"]
			.$get({ param: { id: respuestaId } }, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return SuperJSON.parse(json.respuesta)
			}),
	)
}
export const getRespuestaByIdOptions = (usuarioId: string | undefined, respuestaId: string) => {
	return queryOptions({
		queryKey: ["respuestas", usuarioId, respuestaId],
		queryFn: () => getRespuestaById(respuestaId),
		enabled: !!usuarioId && !!respuestaId,
		staleTime: Infinity,
		throwOnError: true,
	})
}

export async function deleteRespuestaById(respuestaId: string): Promise<Respuestas> {
	return fetchWithAuth().then((token) =>
		client.api.respuestas[":id"]
			.$delete({ param: { id: respuestaId } }, { headers: { Authorization: `Bearer ${token}` } })
			.then(async (res) => {
				const json = await res.json()

				if (!res.ok && "status" in json && "message" in json) {
					await checkRateLimit(json.status as unknown as number)

					throw new Error(json.message as string)
				}

				return SuperJSON.parse(json.respuesta)
			}),
	)
}
