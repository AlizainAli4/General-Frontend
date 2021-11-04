import * as React from 'react';
import Posts from './components/posts';
import Post from './components/post';

function App() {
  const [refresh, setRefresh] = React.useState(false);
  return (
    <div>
      <Post setRefresh={setRefresh}/>
      <Posts refresh={refresh} setRefresh={setRefresh} />
    </div>
    
  );
}

export default App;
