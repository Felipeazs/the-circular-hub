import {
	CartesianGrid,
	Label,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"

type LineGraphProps = {
	name: string
	puntaje: number
	fecha: string
}

export function LineGraph({ data }: { data: LineGraphProps[] | undefined }) {
	return (
		<ResponsiveContainer minWidth={100} minHeight={100}>
			<LineChart
				width={300}
				height={300}
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 10,
				}}>
				<XAxis dataKey="name" fontSize={12}>
					<Label value="Evaluaciones" offset={-5} position="insideBottom" />
				</XAxis>
				<YAxis dataKey="puntaje" fontSize={12} name="Puntaje">
					<Label value="Puntaje" offset={15} position="insideLeft" angle={-90} />
				</YAxis>
				<Tooltip
					contentStyle={{ padding: "0px", margin: "0px" }}
					content={({ active, payload, label }) => {
						if (active && label && payload?.length) {
							return (
								<div className="space-y-3 rounded-md border-1 border-gray-200 bg-white p-2">
									<div>
										<p className="">evaluación {label}</p>
										<p className="text-xs text-gray-400">{payload[0].payload.fecha}</p>
									</div>
									<p>
										puntaje: <span className="text-xl font-bold">{payload[0].value}</span>%
									</p>
								</div>
							)
						}

						return null
					}}
				/>
				<CartesianGrid stroke="#eee" strokeDasharray="7 7" />
				<Line type="monotone" dataKey="puntaje" stroke="#82ca9d" />
			</LineChart>
		</ResponsiveContainer>
	)
}
