import Spinner from "./Spinner";

export default function Loader() {
  return (
    <div
      className="flex h-screen justify-center"
      style={{ marginTop: "220px" }}
    >
      <Spinner />
    </div>
  );
}
