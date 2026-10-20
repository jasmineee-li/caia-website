import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HalftoneField from "@/components/ui/HalftoneField";

export default function NotFound() {
  return (
    <main className="not-found-page grid-paper relative isolate w-full overflow-hidden">
      <HalftoneField color="#0c4da2" className="absolute inset-y-0 right-0 -z-10 hidden w-[46%] md:block" />
      <Container className="flex min-h-[calc(100dvh-76px)] flex-col justify-center py-24">
        <p className="mono-label text-brand-red">Error 404</p>
        <h1 className="display-title mt-5 text-[3rem] leading-[1] sm:text-[4.5rem] lg:text-[5.25rem]">Page Not Found</h1>
        <p className="lead-copy mt-6 max-w-xl">We couldn’t find this page. It may have moved, or the link might be out of date.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Home</Button>
          <Button href="/join" variant="secondary">Get Involved</Button>
        </div>
      </Container>
    </main>
  );
}
