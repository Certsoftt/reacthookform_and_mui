import React from 'react';
import './Form.css'
import {Box} from '@mui/material'
import Theme from './component/MaterilaUI/Dynamic Fields/Theme';
import Fallback from './component/MaterilaUI/Dynamic Fields/Fallback';

const LazyDynamicInput = React.lazy(()=>import('./component/MaterilaUI/Dynamic Fields/DynamicInput'))

function App() {
  return (
    <Box>
      <React.Suspense fallback={<Fallback />}>
        <Theme>
          <LazyDynamicInput/>
        </Theme>
      </React.Suspense>
    </Box>
  );
}

export default App;
