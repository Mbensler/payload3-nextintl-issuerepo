export default async function Homepage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params

  return (
    <div>
     TEST REPO
     Current locale is: {locale}
    </div>
  )
}
