import Sidebar from '../Sidebar';
import Nav from '../Nav';

function RequestView() {

    return (


        <>
            <div className="container-fluid pt-4 px-4">

                <Sidebar />
                <div className="content">

                    <Nav />

                    <div className="col-sm-12 col-xl-12">
                        <div className="bg-light rounded h-100 p-4">
                            <h6 className="mb-4">Request details</h6>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder=""/>
                                <label for="floatingInput">Jail</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder=""/>
                                <label for="floatingInput">Title</label>
                            </div>
                            
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder=""/>
                                <label for="floatingInput">Description</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="date" className="form-control" id="floatingInput"
                                    placeholder=""/>
                                <label for="floatingInput">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput"
                                    placeholder=""/>
                                <label for="floatingInput">Reply</label>
                            </div>
                            
                            
                           <button className='btn btn-primary'>Send</button>
                        </div>
                    </div>


                </div>
            </div>
        </>



    );
}

export default RequestView;
