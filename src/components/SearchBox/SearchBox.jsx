import css from "./SearchBox.module.css"
import { useDispatch, useSelector } from "react-redux"
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
export default function SearchBox() {

  const dispatch = useDispatch();
  const handleChange = (e)=>{
    dispatch(changeFilter(e.target.value))
  }
  const filter = useSelector(selectNameFilter);

  return (
  <div className={css.container}>
      <p className={css.text}>Find contacts by name</p>
      <input className={css.input} value={filter} type="text" name="filter"  onChange={handleChange}></input>
  </div>
  )
}

