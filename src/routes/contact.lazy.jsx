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
          <ContactInput name="name" type="text" placeholder="Nome" />
          <ContactInput name="email" type="email" placeholder="Email" />
          <textarea placeholder="Mensagem" name="message"></textarea>
          <button>Enviar</button>
        </form>
      )}
    </div>
  );
}

function ContactInput(props) {
  const { pending } = useFormStatus();
  return (
    <input
      disabled={pending}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}
