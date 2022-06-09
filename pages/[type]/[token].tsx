import Write from "../../Page-Related/Write/Write";

interface props {
  readonly token: string;
}

export default function Admin(props:props) {

  return  <Write {...props}/>
}

export async function getServerSideProps({ query, req }) {
  return {
    props: { token: query.token },
  };
}
