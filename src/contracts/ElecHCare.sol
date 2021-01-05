pragma solidity >=0.4.21 <0.6.0;

contract ElecHCare {
    uint256 public sympCounter;
    uint256 public labCounter;
    uint256 public imageCounter;
    uint256 public preCounter;

    mapping(uint256 => symptom) public symptoms;
    mapping(uint256 => labtest) public labtests;
    mapping(uint256 => imaging) public imagings;
    mapping(uint256 => prescription) public prescriptions;

    constructor() public {}

    struct symptom {
        string symp;
        address patient;
        string time;
    }

    struct labtest {
        string testname;
        address patient;
        string results;
    }

    struct imaging {
        string hashval;
        address patient;
    }

    struct prescription {
        string drugname;
        string dosage;
        address patient;
    }

    function newSymptom(
        string memory _symp,
        address _patient,
        string memory _time
    ) public {
        sympCounter++;
        symptoms[sympCounter] = symptom(_symp, _patient, _time);
    }

    function newLabtest(
        string memory _testname,
        address _patient,
        string memory _results
    ) public {
        labCounter++;
        labtests[labCounter] = labtest(_testname, _patient, _results);
    }

    function newImaging(string memory _hashval, address _patient) public {
        imageCounter++;
        imagings[imageCounter] = imaging(_hashval, _patient);
    }

    function newprescription(
        string memory _drug,
        string memory _dosage,
        address _patient
    ) public {
        preCounter++;
        prescriptions[preCounter] = prescription(_drug, _dosage, _patient);
    }
}
