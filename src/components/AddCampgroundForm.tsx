export default function AddCampgroundForm (){
    return(
        <div>
            <h1>Create Campground</h1>
            <form>
                <div>
                    <div>
                        <h3>Campground Name</h3>
                    </div>
                    <div>
                        <input type="text" placeholder="Name"></input>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Address</h3>
                    </div>
                    <div>
                        <input type="text" placeholder="Address"></input>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <div>
                            <h3>District</h3>
                        </div>
                        <div>
                            <input type="text" placeholder="District"></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>Province</h3>
                        </div>
                        <div>
                            <input type="text" placeholder="Province"></input>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <div>
                            <h3>Postal code</h3>
                        </div>
                        <div>
                            <input type="text" placeholder="Postal code"></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>Phone number</h3>
                        </div>
                        <div>
                            <input type="text" placeholder="06X-XXX-XXXX"></input>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Picture URL</h3>
                    </div>
                    <div>
                        <input type="text" placeholder="URL"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}