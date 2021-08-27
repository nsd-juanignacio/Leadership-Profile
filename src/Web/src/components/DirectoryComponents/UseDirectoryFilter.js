import React, {useState, useEffect} from "react";
import config from '../../config';
import { useFilterContext } from "../../context/filters/UseFilterContext";

function UseDirectoryFilters () {
    const { API_URL, API_CONFIG } = config();
    const [filterState, send] = useFilterContext();

    const [positions, setPositions] = useState([]);
    const [nameSearch, setNameSearch] = useState(filterState.nameSearch);
    const [degrees, setDegrees] = useState([]);
    const [yearsOptionRange, setYearsOptionRange] = useState(-1);
    const [year, setYear] = useState('');
    const [yearRange, setYearRange] = useState({min: 0, max: 0})
    const [institutions, setInstitutions] = useState([]);
    const [filteredInstitutions, setFilteredInstitutions] = useState(institutions);
    const [filterInstitutionValue, setFilterInstitutionValue] = useState();
    const [categories, setCategories] = useState([]);

    async function getPositions(){
        fetchFilterData(`webcontrols/dropdownlist/assignments`, (response) => {
            responseSetter(response.assignments, setPositions, filterState.positions);
        });
    }

    async function getDegrees(){
        fetchFilterData(`webcontrols/dropdownlist/degrees`, (response) => {
            responseSetter(response.degrees, setDegrees, filterState.degrees);
        });
    }

    async function getInstitutions(){
        fetchFilterData(`webcontrols/dropdownlist/institutions`, (response) => {
            responseSetter(response.institutions, setInstitutions, filterState.institutions);
        });
    }

    async function getCategories(){
        fetchFilterData(`webcontrols/dropdownlist/measurementcategories`, (response) => {
            responseSetter(response.categories, setCategories, null, false);
        });
    }

    function responseSetter(responseObject, setter, initialState, isCheckboxFilter = true){
        var selected = isCheckboxFilter ? "checked" : "selected";
        var newResponse = [];
            responseObject.forEach(element => {
                newResponse.push({
                    "text": element.text,
                    "value": element.value,
                    [selected]: initialState ? initialState.includes(element.value) : false
                })
            });
        setter(newResponse);
    }

    async function fetchFilterData(queryString, callback){
        let unmounted = false;
        const apiUrl = new URL(API_URL + queryString);
        fetch(apiUrl, API_CONFIG('GET')
        ).then(response => response.json())
        .then((response) => {
            if (!unmounted && response !== null && typeof(callback) === 'function') {
                callback(response);
            }
        }).catch(error => {
            console.error(error.message);
        });
        return () => {
            unmounted = true;
        };
    }

    function setCheckValueForElement(elements, setter, value, isChecked){
        let newElements = [...elements];
        newElements.forEach((element) => {
            if (element.value == value) {
                element.checked = isChecked;
            }
        });
        setter(newElements);
    }
    
    function unCheckAllFromElement(elements, setter){
        let newElements = [...elements];
        newElements.forEach((element) => {
            if(element.checked)
                element.checked = false;
        });
        setter(newElements);
    }
    
    useEffect(() => {
        getPositions();
        getDegrees();
        getInstitutions();
        getCategories();
    }, [])

    useEffect(() => {
        setFilteredInstitutions(institutions);
    }, [institutions])

    return {positions, nameSearch, degrees, yearsOptionRange, year, yearRange, 
        institutions, filteredInstitutions, filterInstitutionValue, categories,
         setPositions, setNameSearch, setDegrees, setYearsOptionRange, setYear, setYearRange, 
         setInstitutions, setFilteredInstitutions, setFilterInstitutionValue, 
         setCheckValueForElement, unCheckAllFromElement, 
         setCategories};
}

export default UseDirectoryFilters;