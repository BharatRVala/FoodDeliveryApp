import EditFoodItem from "@/app/_components/EditFoodItem";
export default function Page({ params }) {
  return <EditFoodItem foodId={params.id} />;
}
