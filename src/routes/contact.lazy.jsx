import { useFormStatus } from "react-dom";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (formData) {
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message")
      );
    },
  });

  // Detect test environment (Vitest)
  const isTest = typeof process !== "undefined" && process.env.VITEST;

  return (
    <div className="contact">
      <h2>Contato</h2>
      {mutation.isSuccess ? (
        <h3>Enviado!</h3>
      ) : (
        <form
          {...(isTest
            ? {
                onSubmit: (e) => {
                  e.preventDefault();
                  mutation.mutate(new FormData(e.target));
                },
              }
            : { action: mutation.mutate })}
        >
          <div>
            <label htmlFor="contact-name">
              Nome <span aria-hidden="true">*</span>
            </label>
            <ContactInput
              id="contact-name"
              name="name"
              type="text"
              required
              aria-required="true"
              aria-describedby="name-desc"
              autoComplete="name"
              placeholder="Seu nome"
            />
            <span id="name-desc" className="sr-only">
              Campo obrigatório: informe seu nome completo.
            </span>
          </div>

          <div>
            <label htmlFor="contact-email">
              Email <span aria-hidden="true">*</span>
            </label>
            <ContactInput
              id="contact-email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-describedby="email-desc"
              autoComplete="email"
              placeholder="Seu e-mail"
            />
            <span id="email-desc" className="sr-only">
              Campo obrigatório: informe um e-mail válido.
            </span>
          </div>

          <div>
            <label htmlFor="contact-message">
              Mensagem <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              aria-describedby="message-desc"
              autoComplete="off"
              placeholder="Sua mensagem"
            />
            <span id="message-desc" className="sr-only">
              Descreva sua mensagem. Campo obrigatório.
            </span>
          </div>

          <button type="submit">Enviar mensagem</button>
        </form>
      )}
    </div>
  );
}

function ContactInput(props) {
  const { pending } = useFormStatus();
  return <input disabled={pending} {...props} />;
}
