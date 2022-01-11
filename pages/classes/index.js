import Layout from "../../components/Layout";
import { Table, Form, FormControl,Button, Row, Col , Pagination} from "react-bootstrap";
import * as mdb from 'mdb-ui-kit'
import { Input } from 'mdb-ui-kit'

export default function Classes() {
	return (
    <Layout>
      <div className="container-fluid">
             <Row>
               <Col xs={3}>
           <Button href="/form" variant="primary" >Add</Button>
           </Col>
           <Col>
         <Form className="d-flex" >
             <FormControl
               type="search"
               placeholder="find by name"
               className="me-2"
               aria-label="Search"
             />
           </Form>
           </Col>
           </Row>
           </div>

<div className="container-fluid">
<table class="table">
  <thead class="table-primary">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Slot</th>
      <th scope="col">Trainer</th>
      <th scope="col">Location</th>
      <th scope="col">Price</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Default</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>

    <tr class="">
      <th scope="row">Primary</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr class="">
      <th scope="row">Secondary</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr class="">
      <th scope="row">Success</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr class="">
      <th scope="row">Danger</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr class="">
      <th scope="row">Warning</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr class="">
      <th scope="row">Info</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr class="">
      <th scope="row">Light</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr class="">
      <th scope="row">Dark</th>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
  </tbody>
</table>
</div>

<div className="container-fluid">
<nav aria-label="...">
  <ul class="pagination justify-content-end">
    <li class="page-item">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="#">2 <span class="visually-hidden">(current)</span></a>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
</div>
</Layout>
  )
  }





// import Layout from "../../components/Layout";
// import { Table, Form, FormControl,Button, Row, Col , Pagination} from "react-bootstrap";

// export default function Classes(props) {
//   const {handler} = props
// 	return (
// 		<Layout>
// 			<div>
//         <Row>
//           <Col xs={3}>
//       <Button href="/form" variant="primary" >Add</Button>
//       </Col>
//       <Col>
//     <Form className="d-flex" >
//         <FormControl
//           type="search"
//           placeholder="find by name"
//           className="me-2"
//           aria-label="Search"
//           oneChange={handler}
//         />
//       </Form>
//       </Col>
//       </Row>
     
// 			<Table hover responsive variant="">
//   <thead>
//     <tr >
//       <th>Name</th>
//       <th>Type</th>
//       <th>Slot</th>
//       <th>Trainer</th>
//       <th>Location</th>
//       <th>Price</th>
//       <th>Date</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       {/* <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td> */}
//     </tr>
//     <tr>
//       {/* <td>Jacob</td>
//       <td>Thornton</td>
//       <td>@fat</td> */}
//     </tr>
//     <tr>
//       {/* <td >Larry the Bird</td>
//       <td>@twitter</td>
//       <td>@twitter</td> */}
//     </tr>
//   </tbody>
// </Table>
// 			</div>
// 		</Layout>
// 	);
// }