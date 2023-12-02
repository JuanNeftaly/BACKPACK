import React, { useEffect, useState } from 'react'
import { Load } from '../Load/Load'
import { NavBar } from '../NavBar/NavBar'
import { Bar } from '../Bar/Bar'
import { FooterEnd } from '../../Page/Footer/FooterEnd'
import { Filter } from '../Filter/Filter'
import { Material } from '../Material/Material'
import { Reporte } from '../Reporte/Reporte'
import { AddMaterialForm } from '../AddMaterialForm/AddMaterialForm'
import { getAllMaterialesClient, getMateriaEspecific } from '../../../../services/materias.service'
import { keyGenerator } from '../../../../helpers/key'

export const Materiales = () => {
  const[backReport, setBackReport] = useState(false);
  const[backAdd, setBackAdd] = useState(false);


  const[documentosClient, setDocumentosCLient] = useState([]);

    const extrarDocumentos = async()=>{
        const extraer = await getAllMaterialesClient();
        setDocumentosCLient(extraer.documents);
    }

    useEffect(()=>{
        extrarDocumentos();
    },[])

    const[search, setSearch] = useState('');


    //METODO DEL FILTRADO AUTOMATICO
  
    const results = !search ? documentosClient : documentosClient.filter((dato)=> dato.title.includes(search));
    


  return (
    <div>

      {
        backReport ? <Reporte setBackReport={setBackReport}/> : null
      }

      {
        backAdd ? <AddMaterialForm setBackAdd={setBackAdd}/> : null
      }


      <Load/>
      <NavBar search={search} setSearch={setSearch}/>
      <Bar/>


      <div className='material__div'>
            {
                results.map((doc)=>{
                    return <Material setBackReport={setBackReport} doc={doc} key={keyGenerator()}/>
                })
            }
      </div>

      <FooterEnd/>

    </div>
  )
}
