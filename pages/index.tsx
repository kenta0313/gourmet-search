import Head from 'next/head'
import Link from 'next/link'

const defaultEndpoint =
`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json&large_area=Z011`

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}

export default function Home({ data }) {
  return (
    <>
        <Head>
          <title>東京グルメ店検索</title>
        </Head>
        <ul>
          {data.results.shop.map((item: any, index: string) => {
            return (
              <li key={index}>
                <Link href={item.urls.pc}>
                  <a>
                    <div >
                      <div >
                        <div>
                          <img src={item.photo.mobile.s} alt={item.name} />
                        </div>
                      </div>
                      <div>
                        <div> {item.name}</div>
                        <div>
                          <div>
                            <span>
                              {item.genre.name}
                            </span>
                            <span>{item.catch}</span>
                          </div>
                          <p> {item.access}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
   </>
  )
}