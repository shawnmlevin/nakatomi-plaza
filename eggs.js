/*
 * NAKATOMI PLAZA — everything personal lives in this file.
 * Look for "EGG:" comments. Text in [square brackets] is a placeholder to replace.
 * The Vault message is NOT in here: it's encrypted in vault.js (see tools/encrypt-vault.mjs).
 */
window.NAKATOMI = {
  // The holiday party = the Cracked Nuts run. Each RSVP links to that show's ticket page.
  party: {
    entertainment: "Cracked Nuts",
    venue: "Suzanne Roberts Theatre, 480 S Broad St, Philadelphia",
    dressCode: "Festive. Shoes optional.",
    shows: [
      { day: "Fri, Dec 18", time: "7:00 PM", url: "https://www.flairdancecompany.com/event-details/cracked-nuts-friday-dec-18th-at-7pm" },
      { day: "Sat, Dec 19", time: "2:00 PM matinee", url: "https://www.flairdancecompany.com/event-details/cracked-nuts-saturday-dec-19th-at-2pm-matinee" },
      { day: "Sat, Dec 19", time: "7:00 PM", url: "https://www.flairdancecompany.com/event-details/cracked-nuts-saturday-dec-19th-at-7pm" },
      { day: "Sun, Dec 20", time: "5:00 PM", url: "https://www.flairdancecompany.com/event-details/cracked-nuts-sunday-dec-20th-at-5pm" },
    ],
  },

  // EGG: the daughter's bakery (ground floor). Specials rotate on the board.
  bakery: {
    name: "Sugar Plum Bakery",
    baker: "[Daughter's initial or nickname]",
    specials: [
      "[Her favorite treat]",
      "Gingerbread, any shape",
      "Twinkies (by request of LAPD)",
      "Party trays for the 30th floor",
    ],
  },

  // Lobby directory. Public entries are listed; hidden: true entries only appear
  // when someone types one of their keys exactly (case-insensitive).
  directory: [
    { name: "Nakatomi Trading Corp.", dept: "Executive Offices", floor: 30, note: "Holiday party in progress" },
    { name: "Gennero, H.", dept: "VP, Holiday Party Planning", floor: 30 },
    { name: "Takagi, J.", dept: "Office of the Chairman", floor: 30 },
    { name: "Elfstrom, H.", dept: "Dental Services", floor: 19, suite: 1964, note: "Accepting new patients" },
    { name: "Island Operations", dept: "Misfit Toys Division", floor: 12 },
    { name: "Sugar Plum Bakery", dept: "Food & Beverage", floor: 1 },
    // Cracked Nuts scenes
    { name: "Miser Bros. Climate Control", dept: "Heating (Mr. H.) & Cooling (Mr. C.)", floor: 35, note: "Thermostat disputes handled separately" },
    { name: "Rat Queen Pest Control", dept: "Building Services", floor: "B2", note: "Currently engaged with toy soldiers" },
    { name: "Nutcracker Security Detail", dept: "Toy Soldier Division", floor: "B2" },
    { name: "Precision Snow Removal", dept: "Rooftop Services", floor: "R" },
    { name: "Reindeer Landing", dept: "Rooftop Parking & Night Navigation", floor: "R", note: "Foggy nights: follow the red light" },
    { name: "Reindeer Games", dept: "Recreation League", floor: 9, note: "All reindeer welcome" },
    { name: "Seasonal Staffing", dept: "Elf Relations", floor: 12 },
    { name: "The Candy Man Can, Inc.", dept: "Confections & Imagination", floor: 7, note: "Everything here is edible" },
    { name: "Land of Sweets Realty", dept: "Sugar Plum Properties", floor: 22 },
    { name: "Cornelius Mining & Exploration", dept: "Silver & Gold", floor: "B3", note: "Now also peppermint" },
    { name: "Argyle", dept: "Limousine Services", floor: "P1", note: "Waiting" },
    { name: "Powell, A.", dept: "LAPD Liaison", floor: 1, note: "Twinkie supply" },
    { name: "Building Security", dept: "Main Lobby", floor: 1 },
    { name: "Vault", dept: "Authorized Personnel Only", floor: 30, note: "7 locks engaged" },

    // EGG: hidden entries. Add the kids' names, nicknames, pets, teachers, jersey numbers...
    { hidden: true, keys: ["hermey"], name: "Hermey", dept: "Dental Services", floor: 19, suite: 1964, note: "Now accepting abominable patients" },
    { hidden: true, keys: ["bumble"], name: "Bumble", dept: "Former Lobby Visitor", floor: 1, note: "Teeth removed. Harmless. Now places the star on the lobby tree." },
    { hidden: true, keys: ["rudolph"], name: "Rudolph", dept: "Lead Navigator, Night Operations", floor: "R", note: "Employee of the year, every year since 1964" },
    { hidden: true, keys: ["yukon", "cornelius", "yukoncornelius"], name: "Cornelius, Y.", dept: "Chief Prospector", floor: "B3", note: "Please do not lick the equipment" },
    { hidden: true, keys: ["[son's name]"], name: "[Son]", dept: "[his department]", floor: "[birthday day]", note: "[inside joke]" },
    { hidden: true, keys: ["[daughter's name]"], name: "[Daughter]", dept: "[her department]", floor: "[birthday day]", note: "[inside joke]" },
  ],

  careers: [
    { title: "Associate Dentist", where: "Suite 1964", text: "Not everyone is cut out for toy-making. If you have other ambitions, we want to hear from you." },
    { title: "Pastry Chef", where: "Sugar Plum Bakery", text: "Early mornings, big parties, and the occasional nutcracker emergency." },
    { title: "Window Maintenance", where: "Floors 30–35", text: "Must be comfortable with heights. Fire hose experience a plus." },
    { title: "Climate Technician", where: "Miser Bros. · Floor 35", text: "Must keep the peace between two brothers with very different opinions about the thermostat." },
    { title: "Pest Control Specialist", where: "Level B2", text: "Ongoing rodent situation. Experience working alongside toy soldiers preferred." },
    { title: "Reindeer Handler", where: "Rooftop", text: "Early starts, late nights, and a very busy last week of December. Must be comfortable in fog." },
    { title: "Prospector", where: "Cornelius Mining · Level B3", text: "Searching for silver and gold. Bring your own pickaxe. Peppermint experience a plus." },
  ],

  // EGG: the clue printed under the vault keypad
  vaultHint: "Hint: [something only the kids would know]",
};
