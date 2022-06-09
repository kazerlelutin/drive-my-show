import Manage from "../../../components/_Page-Related/Manage/Manage";

interface props {
  readonly token: string;
}

export default function AdminManage(props: props) {
  return <Manage {...props}/>;
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token },
  };
}
