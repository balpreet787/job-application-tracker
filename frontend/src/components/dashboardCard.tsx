import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardProps {
  title: string
  value: string | number
  icon: React.ElementType
}

export default function DashboardCard({ title, value, icon: Icon }: DashboardCardProps) {
  return (
    <Card className="basis-1/5 border-muted-primary">
      <CardHeader className="flex flex-row items-center pb-8">
        <Icon className="size-6"/>
        <span className="font-semibold text-xl pb-2 pl-2">{title}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}