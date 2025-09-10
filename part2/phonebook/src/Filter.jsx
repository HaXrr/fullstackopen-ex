const Filter = ({ handleSearch }) => {
    return (
        <div>
            Search <input type="text" placeholder='search here by name' onChange={handleSearch} />
        </div>
    )
}

export default Filter