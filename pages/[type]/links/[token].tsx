import Links from "../../../Page-Related/Links/Links";

interface props {
  readonly token: string;
}

export default function AdminLinks(props: props) {
  return <Links {...props}/>;
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token },
  };
}
