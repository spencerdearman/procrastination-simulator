export default function ToastNotification({ text }) {
  return (
    <div
      role="alert"
      className="py-2 px-12 inline-block text-2xl rounded-b-xl absolute top-0 left-1/2 bg-white shadow-lg -translate-x-1/2"
    >
      {text}
    </div>
  );
}
