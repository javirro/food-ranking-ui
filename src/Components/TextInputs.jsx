import '../Styles/textInputs.css'
const TextInputs = ({ data, setData }) => {
  return (
    <section className="inputs-container">
      <input type="text" onChange={(ev) => setData(s => ({ ...s, name: ev.target.value }))} placeholder="Restaurant Name" className="text-inputs" maxLength={120} />
      <input type="text" onChange={(ev) => setData(s => ({ ...s, position: ev.target.value }))} placeholder="Position" className="text-inputs" />
      <input type="text" onChange={(ev) => setData(s => ({ ...s, ubication: ev.target.value }))} placeholder="Ubication" className="text-inputs" />
      <input type="text" onChange={(ev) => setData(s => ({ ...s, price: ev.target.value }))} placeholder="Price" className="text-inputs" />
      <textarea type="text" onChange={(ev) => setData(s => ({ ...s, extra: ev.target.value }))} placeholder="Extra comments" className="text-inputs" maxLength={256} />
    </section>)

}

export default TextInputs