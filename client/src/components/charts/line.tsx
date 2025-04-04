import {
	CartesianGrid,
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
					bottom: 0,
				}}>
				<XAxis dataKey="name" fontSize={12} />
				<YAxis dataKey="puntaje" fontSize={12} />
				<Tooltip />
				<CartesianGrid stroke="#eee" strokeDasharray="7 7" />
				<Line type="monotone" dataKey="puntaje" stroke="#82ca9d" />
			</LineChart>
		</ResponsiveContainer>
	)
}
