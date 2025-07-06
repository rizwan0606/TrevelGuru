const search = () => {
    console.log("Search clicked");
    let searchQuery = query.value.trim().toLowerCase();
    if (!searchQuery) {
      alert("Please enter a search term");
      return;
    }
  
    fetch("travelrecommendation.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        let notfound = true;
  
        data.countries.forEach((country) => {
          country.cities.forEach((city) => {
            if (city.name.toLowerCase().includes(searchQuery)) {
              showResult(city.name, city.imageUrl, city.description);
              notfound = false;
            }
          });
        });
  
        data.temples.forEach((temple) => {
          if (temple.name.toLowerCase().includes(searchQuery)) {
            showResult(temple.name, temple.imageUrl, temple.description);
            notfound = false;
          }
        });
  
        data.beaches.forEach((beach) => {
          if (beach.name.toLowerCase().includes(searchQuery)) {
            showResult(beach.name, beach.imageUrl, beach.description);
            notfound = false;
          }
        });
  
        if (notfound) {
          searchError();
        }
      })
      .catch((error) => {
        console.error(error);
        result.innerHTML = `<p class="notfound">Error loading search data</p>`;
        mydiv.style.display = "block";
      });
  };