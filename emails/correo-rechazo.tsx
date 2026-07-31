import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Tailwind,
    Text,
    pixelBasedPreset,
  } from "react-email";
  
  interface SolicitudRechazadaEmailProps {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const SolicitudRechazadaEmail = ({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    email,
  }: SolicitudRechazadaEmailProps) => {
    const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
    const previewText = "Actualización del estado de tu solicitud";
  
    return (
      <Html>
        <Head />
        <Tailwind
          config={{
            presets: [pixelBasedPreset],
          }}
        >
          <Body className="mx-auto my-auto bg-[#f6f9fc] px-2 font-sans">
            <Preview>{previewText}</Preview>
  
            <Container className="mx-auto my-[40px] max-w-[500px] rounded-lg border border-[#eaeaea] bg-white p-[32px]">
  
              <Section className="text-center">
                <Img
                  src={`${baseUrl}/static/logo.png`}
                  width="60"
                  height="60"
                  alt="Logo"
                  className="mx-auto"
                />
              </Section>
  
              <Heading className="text-center text-[24px] font-bold text-[#111827]">
                Solicitud rechazada
              </Heading>
  
              <Text className="text-[15px] leading-[24px] text-[#374151]">
                Hola <strong>{nombreCompleto}</strong>,
              </Text>
  
              <Text className="text-[15px] leading-[24px] text-[#374151]">
                Agradecemos el tiempo e interés que mostraste al enviar tu
                solicitud.
              </Text>
  
              <Text className="text-[15px] leading-[24px] text-[#374151]">
                Después de revisar la información proporcionada, te informamos
                que en esta ocasión <strong>tu solicitud ha sido rechazada</strong>.
              </Text>
  
              <Text className="text-[15px] leading-[24px] text-[#374151]">
                Esta decisión corresponde a los criterios establecidos durante el
                proceso de evaluación.
              </Text>
  
              <Section className="my-[32px] text-center">
                <Button
                  href="https://tu-sitio.com"
                  className="rounded bg-[#111827] px-6 py-3 text-[14px] font-semibold text-white no-underline"
                >
                  Visitar sitio web
                </Button>
              </Section>
  
              <Hr className="my-[24px] border border-[#e5e7eb]" />
  
              <Text className="text-[12px] leading-[20px] text-[#6b7280]">
                Este correo fue enviado a <strong>{email}</strong>. Si tienes alguna duda sobre el proceso o necesitas asistencia,
                puedes comunicarte con nosotros por WhatsApp.
              </Text>

              <Section className="text-center mt-[12px]">
                <Button
                  href={`https://wa.me/526641727333?text=${encodeURIComponent(
                    "Hola, tengo una duda sobre mi solicitud."
                  )}`}
                  className="rounded bg-[#25D366] px-5 py-3 text-[14px] font-semibold text-white no-underline"
                >
                  Contactar por WhatsApp
                </Button>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  SolicitudRechazadaEmail.PreviewProps = {
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    email: "juan.perez@example.com",
  } as SolicitudRechazadaEmailProps;
  
  export default SolicitudRechazadaEmail;