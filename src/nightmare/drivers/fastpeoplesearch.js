module.exports = function FastPeopleSearchDriver(NightmareModule){
  let driver = {};

  driver.enabled = true;
  driver.options = {};
  driver.options.captcha = true;
  driver.options.hasGETSearchURL = true;

  driver.urls = {};
  driver.urls.searchPage = "www.fastpeoplesearch.com/";
  driver.urls.getSearchURL = function(person){
    return `https://www.fastpeoplesearch.com/name/${person.firstName}-${person.lastName}`;
  };

  driver.selectors = {};
  driver.selectors.searchForm = `#homepage_hero_form`;
  driver.selectors.searchFormFirstName = `.homepage_hero_search_box [name='q']`;
  driver.selectors.searchFormLastName = driver.selectors.searchFormFirstName;
  driver.selectors.searchFormButton = `#search`;
  driver.selectors.waitAfterSearch = ".people-list";
  driver.selectors.eachProfileOnSearchPage = `.card`;
  driver.selectors.eachProfileSynopsisLocation = 'td:nth-child(3)';
  //driver.selectors.nextSearchPage = '.pagination .pagination_item:last-child';
  //driver.selectors.eachProfileLink = '.listview_section'
  driver.selectors.alternate = {};
  driver.selectors.alternate.eachProfileOnSearchPage = '.listview_section';

  driver.funcs = {};

  NightmareModule.functionCreator(driver.funcs, 'eachProfileName', ['profileDom'], 'name',`
    return profileDom.find(".card-title").text();
  `);


  NightmareModule.functionCreator(driver.funcs, 'eachProfileLocation', ['profileDom'], 'locations',`
    let locs = [];
    let current = profileDom.find(".card-text:first-child").text();
    current = current.replace(/(Lives in:)/, '');
    locs.push(current);
    let usedTo = profileDom.find(".card-text:nth-child(3)").text();
    usedTo = usedTo.replace(/(Used to live:)/, '');
    usedTo = usedTo.split(/(.*?),{1}/);
    //locs = locs.concat(usedTo);
    return locs;
  `);

  NightmareModule.functionCreator(driver.funcs, 'eachProfileRelatives', ['profileDom'], 'relatives',`
    let relatives = [];
    profileDom.find("a").each(function(i,e){
      let a = $(e);
      relatives.push(a.text());
    });
    return relatives;
  `);
  

  return driver;
};