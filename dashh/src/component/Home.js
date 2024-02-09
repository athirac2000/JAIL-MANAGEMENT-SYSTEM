

import Sidebar from './Sidebar';
import Nav from './Nav';
import Content from './Content';

function Home() {
  
  return (
    

    <>
    <div className="container-fluid pt-4 px-4">
    
    <Sidebar/>
    <div className="content">
    <Nav/>
    <Content/>
    </div>
    </div>
    </>
   
   
    
  );
}

export default Home;
