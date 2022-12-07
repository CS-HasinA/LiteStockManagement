import { getOnlyUniqueValues } from "../utils/utils";

interface ErrorProps {
  errors: string[];
}

export default function Error({ errors }: ErrorProps) {
  const errorListItems = getOnlyUniqueValues<string>(errors).map((error) => (
    <li key={error}>{error}</li>
  ));

  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-3"
      role="alert"
    >
      <ul>{errorListItems}</ul>
    </div>
  );
}
