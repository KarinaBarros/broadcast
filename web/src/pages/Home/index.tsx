import Button from '@mui/material/Button'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-zinc-900">
      <h1 className="text-4xl font-bold">
        Teste Material e Tailwind
      </h1>

      <Button variant="contained">
        Teste
      </Button>
    </div>
  )
}

export default Home