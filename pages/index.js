import { useState, useEffect } from "react";
import Link from 'next/link'


const Home = () => {
  return(
    <Link href="/sources/startups">
      <a>startups</a>
    </Link>
  )
}

export default Home;