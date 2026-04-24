import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EVENT_ITEMS, TIME_ITEMS } from "@/constant"

export default function Home() {
  return (
    <div className="w-full bg-linear-to-b from-primary/20 to-secondary">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 pt-16 text-center">
        <h1 className="font-sans text-4xl font-semibold sm:text-5xl md:text-6xl md:font-bold lg:text-7xl">
          Plan Your <span className="text-primary">Perfect</span> Event
        </h1>
        <p className="w-full text-muted-foreground md:w-[60%]">
          Create, manage, and join amazing events effortlessly. From intimate
          gatherings to global conferences, we provide the curated tools for
          excellence.
        </p>
        <div className="flex gap-4">
          <Button className="px-8 py-5 text-base">Get Started</Button>
          <Button
            variant="outline"
            className="border-primary px-8 py-5 text-base"
          >
            Browse Events
          </Button>
        </div>
      </div>
      <div className="h-[50vh] w-full bg-transparent"></div>
      <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 md:px-8 lg:grid-cols-3 lg:px-10 xl:px-12">
        {EVENT_ITEMS.map((item) => (
          <Card className="gap-6" key={item.id}>
            <CardHeader className="gap-4">
              <div className="flex size-12 items-center justify-center rounded-md bg-primary/50">
                <item.icon size={24} />
              </div>
              <CardTitle className="text-xl md:text-2xl">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground md:text-base">
              {item.description}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mt-12 grid w-full grid-cols-2 place-items-center gap-4 rounded-2xl bg-primary/5 p-8 px-4 sm:px-6 md:grid-cols-4 md:gap-0">
          {TIME_ITEMS.map((item) => (
            <div
              className="flex flex-col items-center justify-center"
              key={item.id}
            >
              <h2 className="text-3xl font-bold">{item.title}</h2>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="i mt-10 flex w-full flex-col justify-between gap-3 px-4 py-4 sm:px-6 md:flex-row md:gap-0 md:px-8 lg:px-10 xl:px-12">
        <h3 className="text-primary">EventPlanner</h3>
        <div className="flex gap-2">
          <p className="text-muted-foreground">Privacy</p>
          <p className="text-muted-foreground">Terms</p>
          <p className="text-muted-foreground">Contact</p>
          <p className="text-muted-foreground">Instagram</p>
          <p className="text-muted-foreground">Linkedin</p>
        </div>
        <p className="text-muted-foreground">
          © 2024 EventPlanner. Curated Excellence.
        </p>
      </footer>
    </div>
  )
}
