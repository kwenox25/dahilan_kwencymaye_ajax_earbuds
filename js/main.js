(() => {
  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  //functions
  function modelLoaded() {
    hotspots.forEach((hotspot) => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoBoxes) => {
        console.log(infoBoxes);

        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
          const titleElement = document.createElement("h3");
          titleElement.textContent = infoBox.heading;
          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          const imgElement = document.createElement("img");
          imgElement.src = `images/${infoBox.thumbnail}`;

          selected.appendChild(imgElement);
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch((error) => console.error(error)); //catch and report any errors
  }
  loadInfoBoxes();

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((materialListData) => {
        console.log(materialListData);
        materialListData.forEach((material) => {
          //clone the template

          const clone = materialTemplate.content.cloneNode(true);

          //populate the cloned template
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(
            ".material-description"
          );
          materialDescription.textContent = material.description;

          //append the populated template to the list
          materialList.appendChild(clone);
        });
      })
      .catch((error) => console.error(error)); //catch and report any errors
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
