import { useEffect, useState } from "react"
import { getAllMaterias } from "../../../services/materias.service"
import { FooterEnd } from "../Page/Footer/FooterEnd"
import { Bar } from "./Bar/Bar"
import { Load } from "./Load/Load"
import { Materia } from "./Materia/Materia"
import { keyGenerator } from "../../../helpers/key"
import { NavBar } from "./NavBar/NavBar"

export const Home = ({activeCamp, setActiveCamp, userLog,setNameMateria}) => {

  const[materiasHome, setMateriasHome] = useState([]);

  const {token} = userLog;

  const getMaterias = async()=>{
    const allMaterias = await getAllMaterias(token);
    setMateriasHome(allMaterias.materias);

    return materiasHome;
  }

  
  useEffect(()=>{
    getMaterias();
  },[])

  const[search, setSearch] = useState('');


  //METODO DEL FILTRADO AUTOMATICO

  const results = !search ? materiasHome : materiasHome.filter((dato)=> dato.name.includes(search));
  
  


  setActiveCamp(true);

  return (
    <div className="container-home">
      <Load/>

      <NavBar search={search} setSearch={setSearch}/>

      <Bar activeCamp={activeCamp}/> 

      <div className="materia__div">
          {
            results.map((materia)=>{
              return <Materia materia={materia} setNameMateria={setNameMateria} key={keyGenerator()}/>
            })
          }
      </div>

      <FooterEnd/>

    </div>
  )
}
