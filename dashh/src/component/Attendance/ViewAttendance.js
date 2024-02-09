import Sidebar from '../Sidebar';
import Nav from '../Nav';
import { Link } from 'react-router-dom';
function ViewAttendance() {

    return (


        <>
            <div class="container-fluid pt-4 px-4">

                <Sidebar />
                <div class="content">

                    <Nav />

                    <div class="container-fluid pt-4 px-4">
                        <div class="row g-4">

                            <div class="col-12">
                                <div class="bg-light rounded h-100 p-4">

                                    <div className='row'>
                                        <div className='col-10'>

                                            <h6 class="mb-4">Attendance</h6>
                                        </div>
                                        <div className='col-2'>

                                            {/* <Link className='btn btn-primary' to='/addgrades'>Add New</Link> */}
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Prisoner name</th>
                                                    <th scope="col">Status</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>chichu</td>
                                                    <td>absent</td>
                                                    {/* <td><Link className='btn btn-success' to='/editgrades'>Edit</Link>&nbsp;&nbsp;
                                                    <button className='btn btn-danger'>Delete</button>
                                                    </td> */}
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>



    );
}

export default ViewAttendance;