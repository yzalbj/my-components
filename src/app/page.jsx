import { redirect } from "next/navigation"
import './global.css'

export const metadata = {}

export default function IndexPage() {
  redirect('/docs')
  // return (
  //   <h1
  //     style={{
  //       textAlign: 'center',
  //       fontSize: 64,
  //       margin: '25vh 0',
  //       fontWeight: 'bold'
  //     }}
  //   >
  //     Index page
  //   </h1>
  // )
}
