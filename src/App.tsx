import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const width = queryParams.has('width') ? Number(queryParams.get('width')) : 800;
    const height = queryParams.has('height') ? Number(queryParams.get('height')) : 600;

    setColumns(Math.round(width / 100));
    setRows(Math.round(height / 20));

  }, [])


  return (
    <>
      <h1>Expect { columns * rows } items</h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {
          new Array(rows)
            .fill(0)
            .map((_, j) => (
                <div style={{
                  display: 'flex',
                  height: '20px',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {new Array(columns).fill(0).map((_, i) => (
                    <div className={'test-element'} key={i} style={{
                      border: '1px solid black',
                      width: '75px',
                      padding: '0px 10px',
                      background: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
                    }}>
                      <span>{(i + 1) + (j * columns)}</span>
                    </div>)
                  )
                  }
                </div>
              )
            )
        }
      </div>
    </>
  )
}

export default App
