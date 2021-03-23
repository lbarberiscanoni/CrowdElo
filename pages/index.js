import { useState, useEffect } from "react";
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return(
    <Link href="/sources/startups">
      <a>this page!</a>
    </Link>
  )
}

export default Home;