import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { useRouter } from "next/router";

const URL = "https://swapi.dev/api/people/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Character() {
  const router = useRouter();
  const { id } = router.query;

  /*  const id = 1; */
  const { data, error } = useSWR(`${URL}${id}`);

  if (!data && !error) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <Layout>
      <Card
        id={id}
        name={data?.name}
        height={data?.height}
        eyeColor={data?.eye_color}
        birthYear={data?.birth_year}
      />
    </Layout>
  );
}
