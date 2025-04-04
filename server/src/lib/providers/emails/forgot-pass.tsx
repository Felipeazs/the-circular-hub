import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components"

type ForgotPassProps = {
	email: string
	link: string
}

export function ForgotPass({ email, link }: ForgotPassProps) {
	return (
		<Html>
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {
								brand: "#000000",
							},
						},
					},
				}}>
				<Head />
				<Body className="bg-[#ffffff] text-[#24292e] font-sans">
					<Preview>A fine-grained personal access token has been added to your account</Preview>
					<Container className="w-max-[480px] my-0 mx-auto py-[20px] px-[48px]">
						<Text className="text-2xl leading-1.5">
							<strong>The Circular Hub</strong>
						</Text>

						<Text className="text-2xl leading-1.5">
							Hola {email}, una nueva solicitud de creación de contraseña ha sido generada.
						</Text>

						<Section className="p-6 border-1 border-[#dedede] rounded-[5px] text-center">
							<Text className="mb-[10px] text-center">
								Haz click aquí para generar una nueva contraseña
							</Text>

							<Button
								href={link}
								className="text-sm bg-[#28a745] text-white leading-1.5 rounded-[0.5em] py-[12px] px-[24px]">
								Cambiar contraseña
							</Button>
						</Section>
						{/* <Text className="text-center">
						<Link className="text-[#0366d6] text-xs">Your security audit log</Link> ・{" "}
						<Link className="text-[#0366d6] text-xs">Contact support</Link>
					</Text>

					<Text className="text-[#6a737d] text-xs text-center mt-[60px]">
						GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
					</Text> */}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default ForgotPass
