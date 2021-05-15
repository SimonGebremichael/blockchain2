var EFrom = (ETo = EResult = null);

function start() {
  populatePeople();
  printChain();
  fillTransactionNames();
  refreshExahnge();

  document
    .getElementById("sendMoney")
    .addEventListener("click", async function () {
      var from = document.getElementById("user1").value,
        to = document.getElementById("user2").value,
        amount = document.getElementById("amount").value,
        err = document.getElementById("errPrint");
      err.innerText = "";
      amount == "" ? (amount = 0) : (amount = parseInt(amount));
      if (from != to) {
        let f = (t = null);

        people.forEach((element) => {
          if (from == element.id) f = element;
          if (to == element.id) t = element;
        });

        if (amount > f.amount) err.innerText = "Insufficient funds";
        else if (amount <= 0) err.innerText = "Send more than $0";
        else {
          f.amount -= amount;
          t.amount += parseInt(EResult);
          populatePeople();
          var h = await hash(Date.now());
          chain.push({
            from: f.name,
            to: t.name,
            Efrom: EFrom + ": " + amount,
            Eto: ETo + ": " + EResult,
            hash: h.substring(0, 11),
            prevHash: chain[chain.length - 1].hash,
            time: Date.now(),
          });
          printChain();
        }
      } else err.innerText = "Can't send to same account";
    });
  document.getElementById("amount").addEventListener("input", (data) => {
    moneyExchange(data.target.value);
  });
}

function refreshExahnge() {
  var tempSender = document.getElementById("user1").value;
  var tempReciver = document.getElementById("user2").value;
  var amt = document.getElementById("amount").value;
  changeCureency("transSign", true, tempSender);
  changeCureency("exchangeTo", false, tempReciver);
  moneyExchange(amt);
}

function moneyExchange(value) {
  var rate = 0;
  if (EFrom != ETo) {
    exchange.forEach((element) => {
      if (element.name == EFrom) {
        element.curr.forEach((convertedTo) => {
          if (convertedTo.name == ETo) {
            rate = convertedTo.rate;
          }
        });
      }
    });
  } else rate = 1;
  EResult = parseFloat(parseInt(value) * rate).toFixed(2);
  document.getElementById("exchangeTo").innerText = ETo + ": " + EResult;
}

function changeCureency(printTo, type, id) {
  people.forEach((element) => {
    if (id == element.id) {
      document.getElementById(printTo).innerText = element.currentcy + ":";
      type ? (EFrom = element.currentcy) : (ETo = element.currentcy);
    }
  });
}

function printChain() {
  document.getElementById("display").innerHTML = "";
  chain.length == 1
    ? (document.getElementById("BC_title").innerText = chain.length + " Block")
    : (document.getElementById("BC_title").innerText =
        chain.length + " Blocks");
  chain.forEach((element, index) => {
    var container = document.createElement("div");
    container.id = "blockContainer";
    var chainArt = document.createElement("div");
    chainArt.id = "chainArt";
    var block = document.createElement("div");
    block.id = "block";

    if (index <= 0) {
      container.style.gridTemplateColumns = "100%";
      container.style.width = "100%";
      block.style.width = "70%";
      block.style.marginLeft = "20%";
    }

    var data = document.createElement("p");
    data.innerHTML =
      "From: <label>" +
      element.from +
      "</label> To:  <label>" +
      element.to +
      "</label>";
    var amount = document.createElement("p");
    amount.innerHTML =
      "Transfer:  <label>" +
      element.Efrom +
      "</label> for <label>" +
      element.Eto +
      "</label>";
    var hash = document.createElement("p");
    hash.innerHTML = "Hash:  <label>" + element.hash + "</label>";
    hash.id = "hash";
    var prev = document.createElement("p");
    prev.innerHTML = "Previouse Hash:  <label>" + element.prevHash + "</label>";
    var time = document.createElement("p");
    time.innerHTML = "Time:  <label>" + element.time + "</label>";

    block.appendChild(data);
    block.appendChild(amount);
    block.appendChild(hash);
    block.appendChild(prev);
    block.appendChild(time);
    if (index > 0) {
      container.appendChild(chainArt);
    }
    container.appendChild(block);
    document.getElementById("display").appendChild(container);
  });
}

function populatePeople() {
  document.getElementById("people").innerHTML = "";
  people.forEach((element) => {
    var person = document.createElement("div");
    person.id = "person";

    var name = document.createElement("h3");
    name.innerText = element.name;

    var amount = document.createElement("p");
    amount.innerText = element.currentcy + ": " + element.amount;

    person.appendChild(name);
    person.appendChild(amount);
    document.getElementById("people").appendChild(person);
  });
}

function fillTransactionNames() {
  people.forEach((element, index) => {
    var name = document.createElement("option");
    var name2 = document.createElement("option");
    name.innerText = element.name + "  (" + element.currentcy + ")";
    name2.innerText = element.name + "  (" + element.currentcy + ")";
    name.value = element.id;
    name2.value = element.id;
    if (index == 0) name.selected = true;
    if (index == 1) name2.selected = true;
    document.getElementById("user1").appendChild(name);
    document.getElementById("user2").appendChild(name2);
  });
}

// const found = array1.find(element => element == 5);

async function hash(target) {
  var buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(target)
  );
  var chars = Array.prototype.map
    .call(new Uint8Array(buffer), (ch) => String.fromCharCode(ch))
    .join("");
  return btoa(chars);
}

var people = [
  {
    id: "h38fw4fj32hj4u",
    name: "Kim J",
    amount: 100,
    currentcy: "CAD",
  },
  {
    id: "4j6576hg3e4rgfejk",
    name: "Tom F",
    amount: 50,
    currentcy: "USD",
  },
  {
    id: "g45u6e7dhg4ge5g35h",
    name: "Rick S",
    amount: 430,
    currentcy: "EUR",
  },
  {
    id: "erg45h56hs5r6h56",
    name: "Dona H",
    amount: 10000,
    currentcy: "YEN",
  },
];

var chain = [
  {
    from: "-",
    to: "-",
    Efrom: "-",
    Eto: "-",
    hash: "Initial Block",
    prevHash: "-",
    time: Date.now(),
  },
];

const exchange = [
  {
    name: "CAD",
    curr: [
      {
        name: "USD",
        rate: 0.8258797684,
      },
      {
        name: "EUR",
        rate: 0.6800483966,
      },
      {
        name: "YEN",
        rate: 90.330599671,
      },
    ],
  },
  {
    name: "USD",
    curr: [
      {
        name: "CAD",
        rate: 1.21083,
      },
      {
        name: "EUR",
        rate: 0.823423,
      },
      {
        name: "YEN",
        rate: 109.375,
      },
    ],
  },
  {
    name: "EUR",
    curr: [
      {
        name: "CAD",
        rate: 1.4704835789,
      },
      {
        name: "USD",
        rate: 1.2144426376,
      },
      {
        name: "YEN",
        rate: 132.82966349,
      },
    ],
  },
  {
    name: "YEN",
    curr: [
      {
        name: "CAD",
        rate: 0.0110704457,
      },
      {
        name: "USD",
        rate: 0.0091428571,
      },
      {
        name: "EUR",
        rate: 0.0075284389,
      },
    ],
  },
];
