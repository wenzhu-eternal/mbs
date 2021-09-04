import { request } from "@/utils";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    request('GET', 'api/user/findUsers?page=1&pageSize=10')
      .then((res) => console.log('res :>> ', res))
      .catch((err) => console.log('err :>> ', err))
  }, [])
  return <h2>About</h2>;
}