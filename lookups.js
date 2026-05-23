var lookups = {
    ratingType: { faces: 1, stars: 2 },
    module: { residency: 1, visa: 2, sponsor: 3, investigation: 0, fines: 5, other: 6, ICAandResi: 10, ICA: 12, ICAGccCitizen: 13, familyBook: 14, seaPort: 9, workPackage: 18 },
    ServiceTransactions: {
        refundFees: 375, refundDeposit: 376, gccNewVisa: 2, gccCancelVisa: 3, issueLongStayCourtesyVisaSingleEntry: 4, establishmentNewVisa: 6,
        issueMultipleEntryLongStayCourtesyVisa: 8, issueSingleEntryShortStayCourtesyVisa: 15,
        createCitizenSponsorFile: 411, createResidentSponsorFile: 412, urgentService: 188, modifyApplication: 394,
        fines: 407, changeStatus: 400, mohriChangeStatus: 84, securityDepositService: 417, printFamilyBook: 489,
        additionalFines: 431, extendVisaForGCC: 54, extendVisaForIndianGreenCardHolder: 433, extendVisaForCertainCountries: 50,
        extendVisaForGCCResident: 436, estateSponsorFile: 434, farmSponsorFile: 435, cancelResidencyWithoutSponsored: 443,
        cruiseShipLongVisit: 454, cruiseShipShortVisit: 455, issueEstablishmentCard: 139, renewGovernmentEstablishmentCard: 158,
        renewEstablishmentCard: 157, neighbouringBordersVisa: 43, guestVisaForCertainCountries: 464, cancelEstablishmentCard: 162,
        newBornForExecutiveManagerForEntrepreneur: 689, newBornForPersonsWhoAreTalented: 690, newBornOfHumanitarianPioneers: 1116,
        newBornForCountriesofDisastersService: 685, payEstablishmentCardFines: 440, payEstablishmentBoxFines: 441, payDelegateCardFines: 442, renewDelegateCardGcc: 152,
        renewDelegateCardFZ: 154, cancelDelegateCard: 161, delegateCardDataModification: 159, requestInitialApprove: 148, mohreVisa: 472, printMohreVisa: 32,
        exceptionalPermitRequest: 477, moveResidenceToANewPassport: 92, renewPassport: 473, issueEstablishmentCardPrivateSector: 140,
        issueEstablishmentCardSmallProject: 141, renewEstablishmentCardSmallProject: 157, exceptionalEntryRequest: 476,
        exceptionalExitRequest: 478, exceptionalExitEntryRequest: 479, passportLost: 475, renewSmallEstablishmentsCards: 156,
        renewDelegateCardTC: 153, seaPortShipTripService: 481, mohreVisaSponsor: 485, printMohreVisaIndevidual: 430,
        extraFineEstabCard: 491, extraFinePROCard: 492, diplomaticSponsor: 420, familyOfInvestorOrPartner: 36,
        residenceForResidentFamilyWorkingInPublicSector: 37, ResidenceForResidentFamilyWorkingInPrivertSectorOrFreezone: 38,
        NewBornVisaHolders: 208, establishmentCardDataModification: 160, renewFreeZoneEstablishmentCard: 157, renewPublicEstablishmentCard: 158,
        ResidencyDataModification: 401, VisaDataModification: 413, cancelVisa: 414, exceptionalCancelVisa: 490, issueVisaForIndianNationalsWithSpecialVisas: 432, issueVisaForLocalOrGccSponsorOrStudentsSponsoredByUniversitiesOrColleges: 39,
        isCountriesofDisastersService: 515, isDivorcedOrWidowedService: 516, isWorkSeekerService: 512, isWorkSeekerFamilyService: 529,
        residencyService: 57, countriesOfDisastersInvestor: 526, eidaInqueryService: 530, exceptionalEntryExitRequest: 545,
        propertyOwnerNewVisa: 40, isDivorcedOrWidowedFamilyService: 563, isDivorcedOrWidowedNewBorn: 568, sonAbove18Service: 569,
        finishedStudyingInsideUAEService: 567, workJourney: 579, workcontract: 578, mdeicalexamination: 577, workSeekerAccompany: 581,
        familyBookAddChild: 583, issueFirstFamilyBook: 582, familyBookAddWifeOrHusband: 587, reportsResidenceDetails: 447, reportsVisaDetails: 446, dubaiResidentsNewBorn: 580, familyBookReplacement: 592, familyBookSeparateRegistrationAfter30: 595, issueFamilyBookInReplaceOrDamage: 591, familyMemberUpdateInformation: 594,
        removePersonDueToDeath: 593, leavePermit: 588, removePersonDueToDivorce: 596,
        dubaiResidentsRenewService: 571,
        dubaiResidentsNewService: 570,
        dubaiResidentsReplaceId: 572,
        fastTrackRequest: 742,
        issueVisaForGCCResidenceAccompany: 41, sixmonthsToFinalizeTheProceduresOfGoldenResidency: 603, issueVisaForSixMonthsToFinalizeTalentedVisa: 606,
        issueVisaForSixMonthsToFinalizeLongTermResidency: 604, issueShortStayPleasureVisaForGovernmentEstablishment: 597,
        ResidencyForNewBornAndSponsorTypeInvestor: 69, addAccompanyForResidencePermits: 85, permanentResidencyIssueVisa: 781, permanentResidency: 782,
        issuelongStayPleasureVisaForGovernmentEstablishment: 608, issueMultiEntryShortStayPleasureVisaForGovernmentEstablishment: 610,
        issueMultiEntrylongStayPleasureVisaForGovernmentEstablishment: 609,
        CancelledResidencesSponsoredByEstablishments: 607,
        longTermResidencyFamilyMembersofPersonsWhoAreTalented: 611,
        LocalOrGccCitizenSponsorShipReportEscape: 409,
        LocalOrGccCitizenSponsorShipRemoveReportEscape: 200,
        ResidencySponsorShipReportEscape: 410,
        ResidencySponsorShipRemoveReportEscape: 202,
        modifyVisaService: 413,
        longTermResidencyFamilyMembersInvestorsTheirSeniorEmployees: 612,
        longTermResidencyInvestorsOrThierSeniorEmployees: 602,
        longTermResidencyEntrepreneursOrThierExecutiveDirectors: 601,
        longTermResidencyPropertyInvestorsOrThierSeniorEmployee: 613,
        longTermResidencyFamilyMembersEntrepreneursOrThierExecutiveDirectors: 614,
        longTermResidencyFamilyMembersStudentsWithSpecialScientificAbilities: 615,
        goldenResidencyFamilyMemberOfStudentsWithSpecialScientificAbilitiesIssueResidency: 756,
        longTermResidencyFamilyMembersPropertyInvestorsOrThierSeniorEmployee: 616,
        residencyNewBornSponsorWorkingInPublicSector: 70,
        newVisaSailorPermitOtherShips: 49,
        diplomaticCardForPersonIssue: 617,
        diplomaticCardForFamilyMember: 618,
        diplomaticCardForPersonRenew: 619,
        diplomaticCardForFamilyMemberRenew: 620,
        issueLeavePermitForExemption: 212,
        cancelLeavePermitForExemptionAndCreateNewOne: 623,
        newBornResidence: 71,
        longTermResidencystudentsWithSpecialScientificAbilities: 600,
        finesForCancelLeavePermitForExemption: 624,
        diplomaticCardForPersonCancel: 625,
        nonGovFreeZoneReportEscape: 185,
        governmentEstablishmentReportEscape: 184,
        diplomaticPersonFamilyMembersCancel: 626,
        isDivorcedOrWidowedRenew: 627,
        isDivorcedOrWidowedRenewResiAndEida: 852,
        isDivorcedOrWidowedFamilyRenew: 628,
        isDivorcedOrWidowedFamilyRenewUnifiedForm: 889,
        entryVisaTransit: 518,
        decree28_InvestorInPublicInvestments: 632,
        decree28_InvestorInRealEstate: 633,
        decree28_Entrepreneur: 634,
        decree28_PersonsWhoAreTalented: 635,
        decree28_StudentsWithSpecialScientificAbilities: 636,
        goldenResidencyGraduatesAccreditedUniversitiesIssueVisa: 753,
        goldenResidencyGraduatesAccreditedUniversitiesIssue10YearResidency: 754,
        goldenResidencyForFamilyMemberOfGraduatesAccreditedUniversites: 755,
        foreignerRetiredVisa: 639,
        foreignerRetiredResidency: 640,
        foreignerRetiredResidencyForFamilyMembers: 641,
        foreignerRetiredResiAndEidaForFamilyMembers: 867,
        foreignerRetiredVisaForFamilyMembers: 642,
        residencyForFamilyMemberOfRealEstateInvestor: 644,
        residencyForFamilyMemberOfStudentsWithSpecialScientificAbilities: 645,
        residencyForFamilyMemberOfInvestorInPublicInvestments: 646,
        residencyForFamilyMemberOfPersonsWhoAreTalented: 647,
        residencyForFamilyMemberOfEntrepreneur: 648,
        issueResidencyForFamilyMemberOfStudentsWithSpecialScientificAbilities: 656,
        issueResidencyForFamilyMemberOfRealEstateInvestor: 657,
        issueResidencyForFamilyMemberOfPersonsWhoAreTalented: 658,
        issueResidencyForFamilyMemberOfEntrepreneur: 659,
        issueResidencyLongTermSeniorEmployeesofInvestorinpublicinvestments: 660,
        issueResidencyLongTermExecutiveManagerEntrepreneur: 661,
        issueResidencyLongTermAndEIdExecutiveManagerEntrepreneur: 844,
        issueResidencyLongTermAndEIdSeniorEmployeesofInvestorinpublicinvestments: 845,
        issueResidencyForFamilyMemberOfInvestorInPublicInvestments: 662,
        issueVisaResidencyForFamilyMemberOfSeniorEmployeeForInvestorInPublicInvestments: 664,
        issueResidencyForFamilyMemberOfSeniorEmployeeOfInvestorInPublicInvestments: 665,
        icaRefund: 663,
        icaExemptions: 566,
        issueResidencyForFamilyMemberOfExecutiveManagerForEntrepreneur: 667,
        decree28_ResidencyPersonsWhoAreTalented: 599,
        sponsorRenewEstablishmentCard: 158,
        renewCountriesofDisastersService: 668,
        renewCountriesofDisastersGccService: 669,
        renewCountriesofDisastersGovService: 670,
        renewCountriesofDisastersFreeZonService: 671,
        renewCountriesofDisastersInvestorService: 672,
        renewCountriesofDisastersDiplomaticService: 673,
        renewCountriesofDisastersBusinessmanService: 674,
        exceptionalRefund: 675,
        renewResidencyForDomisticHelperFamilyMembers: 680,
        issueResidencyForDomisticHelperNewBornWithinUae: 681,
        cancelEstateSponsorFile: 682,
        cancelFarmSponsorFile: 683,
        addInsurancePolicy: 393,
        extendVisaForFinalizeTheProceduresOfTheInvestor: 684,
        visaWorkPublicSectorNewissue: 29,
        visaFreezoneNewIssue: 34,
        workPermitNewIssue: 472,
        studentsSponsoredbyUniversitiesOrColleges: 691,
        shortStayPleasureVisa: 9,
        longStayPleasureVisa: 1,
        issueResidencyForFamilyMembersOfTheSponsorUaeCitizenOrGccCitizen: 56,
        issueResidencyForFamilyMembersOfTheSponsorUaeCitizen: 987,
        issueResiAndEidaForFamilyMembersOfTheSponsorUaeCitizenOrGccCitizen: 884,
        issueResiAndEidaForFamilyMembersOfTheSponsorUaeCitizen: 986,
        renewResidencyForFamilyMembersOfTheSponsorUaeCitizenOrGccCitizen: 367,
        renewResiAndEidaForFamilyMembersOfTheSponsorUaeCitizenOrGccCitizen: 902,
        issuePassport: 692, replacePassport: 693,
        extendVisaSingle: 548,
        issueLostCard: 142,
        residencyFamilyMembersOfTheSponsorWorkingInPrivateSectorOrFreeZone: 59,
        entryExit: 369,
        EXTEND_VISA_NORM_OF_RECIPROCITY_30: 700,
        EXTEND_VISA_NORM_OF_RECIPROCITY_90: 701,
        EXTEND_VISA_NORM_OF_RECIPROCITY_60: 702,
        EXTEND_VISA_NORM_OF_RECIPROCITY_180: 703,
        EXTEND_VISA_CITIZENS_OF_SCHENGEN_COUNTRIES: 704,
        EXTEND_VISA_CITIZENS_OF_REPUBLIC_OF_SEYCHELLES: 705,
        EXTEND_VISA_CITIZENS_OF_REPUBLIC_OF_MAURITIUS: 706,
        EXTEND_VISA_SPECIAL_AGREEMENTS: 707,
        naturalizationRequest: 713,
        objectionService: 699,
        updateMobileNumber: 714,
        femaleChildrenNaturalizationRequest: 719,
        citizenWifeNaturalizationRequest: 720,
        residentEntryPermission: 708,
        specialEstablishmentsNewbornResidency: 727,
        newRsaRegistration: 721,
        citizenMothersNameModification: 730,
        citizenBirthdateModification: 731,
        citizenAgeEstimation: 732,
        citizenFirstNameModification: 733,
        citizenAddingAnExistingNickname: 734,
        companyTransferTtoCourtRequest: 209,
        companyTransferToCourtRequest: 207,
        companyVisitTransferToCourtRequest: 206,
        rsaResetPinForSameUser: 722,
        rsaResetPinForRelatedUser: 726,
        newBornPayFines: 165,
        issueNewEmiratesIDForDiplomatic: 735,
        renewEmiratesIDForDiplomatic: 736,
        replaceEmiratesIDForDiplomatic: 738,
        newBornPackage: 740,
        IcaRenewUniversitiesColleges: 509,
        cancelResidency: 406,
        payDepositGateway: 746,
        validationGatway: 744,
        addSubUserSubscription: 695,
        renewSubUserSubscription: 751,
        replaceSubUser: 631,
        cancelSubUser: 1061,
        goldenVisaExecutiveDirectorForEntrepreneurs: 649,
        goldenVisaForSeniorEmployeesOfPublicInvestmentInvestor: 650,
        guardianship: 761,
        maritalStatusModification: 762,
        issueNewVisaForVirtualWorkWorker: 763,
        issueNewVisaForInvestorFamilyInPublicInvestments: 764,
        issueNewResidencyForVirtualWorkWorker: 765,
        virtualResidencyForFamilyMember: 768,
        virtualResiAndEidaForFamilyMember: 869,
        virtualResidencyForNewBorn: 769,
        issueNewFamilyBookDueDivorcing: 766,
        NOMINATION_REQUEST_FOR_GOLDEN_RESIDENCE: 767,
        cancelLeavePermit: 495,
        renewResidencyForFamilyMemberOfStudentsWithSpecialScientificAbilities: 777,
        renewRoldenResidencyForFamilyMemberOfGraduatesAccreditedUniversites: 778,
        talentedYouthProgramVisa: 780,
        talentedYouthProgramResidency: 779,
        longTerm5YearsMultiEntry: 783,
        longTerm5YearsMultiEntryFamilyGroup: 784,
        foreignerRetiredOutsideUaeVisa: 786,
        finalizeTheProceduresOfGoldenResidency6Months: 603,
        mediumTermResidenceVisaforGraduatesforBest100UniversitiesOutsideUAE: 787,
        shortTermResidenceVisaforGraduatesforBest200UniversitiesOutsideUAE: 794,
        mediumTermResidenceforGraduatesforBest100UniversitiesOutsideUAE: 788,
        shortTermResidenceforGraduatesforBest200UniversitiesOutsideUAE: 793,
        nominationRequest: 767,
        visaForUniversityGraduatesOutsideUAE: 795,
        visaForUniversityGraduatesInsideUAE: 797,
        residencyForUniversityGraduatesInsideUAE: 796,
        residencyForUniversityGraduatesOutsideUAE: 798,
        issueShortTermVisaForEntrepreneurs: 800,
        issueShortTermResiForEntrepreneurs: 802,
        IssueGoldenResiVisaForHigherEducations: 799,
        issueGoldenResidencyForHigherEducations: 801,
        issueResidencyVisaForExperiencedWorkersInsideUAE: 803,
        issueResidencyForExperiencedWorkersInsideUAE: 804,
        newBornForPersonGraduatesFromUniversityInsideUAE: 820,
        issueResidencyVisaForSkilledWorkersOutsideUAE: 821,
        issueResidencyVisaForFreelancersOutsideUAE: 828,
        issueResidencyForSkilledWorkersOutsideUae: 822,
        issuePassportFromOutsideUae: 827,
        issueResidencyForFreelancersInsideUae: 829,
        issueResidencyForFreelancersOutsideUae: 830,
        issueResidencyVisaForFreelancersInsideUAE: 831,
        issueResidencyAndIdentityForNewBornSponsoredByUaeOrGCC: 558,
        issueResidencyAndIdentityForNewBornCitizenSponsor: 988,
        newBornTransferToCourtRequest: 739,
        issueWorkVisaWithoutEntryPermitForHotelEstablishment: 837,
        removeEscapeReportNonGovernment: 201,
        removeEscapeReportGovernment: 203,
        breadwinningRequest: 838,
        escapeReportForPublicSector: 203,
        escapeReportForPrivateSector: 201,
        issueResidence_Work_PrivateSector: 61,
        renewResidence_Work_PrivateSector: 124,
        passportLosing: 839,
        exceptionalCancelResidence: 445,
        mohreCancelResidency: 132,
        issueVisaNationalsExemptionsCountriesEntryPermission: 698,
        extendVisaLongTerm5YearsMultiEntry: 785,
        issueResiAndEidaForFamilyMemberOfInvestorInPublicInvestments: 843,
        issueResiAndEidaForFamilyMemberOfStudentsWithSpecialScientificAbilities: 842,
        issueResiandEidaForFamilyMemberOfRealEstateInvestor: 841,
        issueResiAndEidaForFamilyMemberOfPersonsWhoAreTalented: 847,
        issueResiAndEidaForFamilyMemberOfEntrepreneur: 846,
        goldenResidencyFamilyMemberOfStudentsWithSpecialScientificAbilitiesIssueEidaAndResi: 865,
        issueResiAndEidaForFamilyMemberOfExecutiveManagerForEntrepreneur: 864,
        goldenResiAndEidaFamilyMemberOfStudentsWithSpecialScientificAbilitiesIssueResidency: 856,
        renewGoldenResiAndEidaForFamilyMemberOfGraduatesAccreditedUniversites: 890,
        issueResiIcaForTalentedPerson: 855,
        issueExceptionalSponsorNewBornIcaResi: 870,
        DivorcedOrWidowedServiceIssueUnifiedForm: 883,
        DivorcedOrWidowedServiceRenewUnifiedForm: 899,
        renewResidencyForFamilyMemberOfPersonsWhoAreTalented: 776,
        issueDivorcedAndWidowedForFamily: 879,
        renewDivorcedAndWidowedForFamily: 889,
        countriesOfDisastersAndWarsWithoutSponsorIssueUnifiedForm: 853,
        countriesOfDisastersAndWarsWithoutSponsorRenewUnifiedForm: 895,
        countriesOfDisastersAndWarsNewBornIssueUnifiedForm: 840,
        renewResiAndEidaForStudentsStudyingOrFinishedStudying: 909,
        deleteResidenceAccompany: 89,
        unifiedFormSonAbove18Service: 900,
        nonCitizenWifeGuardianship: 903,
        unifiedFormForFamilyMembersDomesticHelperIssue: 907,
        entryExitRoadTrip: 910,
        renewResidenceForWorkForGovernmentSector: 123,
        establishmentForRenewResidenceAndEIDAForWorkForGovernmentSector: 501,
        establishmentForRenewresidenceandeidaForWorkForPrivatesector: 499,
        unfiedFormForVirtualWork: 873,
        RenewResidenceAndIdentityForFamilyMemberOfForeignerRetired: 915,
        TruckDriversVisa30DaysSingleEntryIssue: 967,
        TruckDriversVisa60DaysSingleEntryIssue: 968,
        TruckDriversVisa90DaysSingleEntryIssue: 969,
        SearchForJobVisa60DaysSingleEntryIssue: 939,
        SearchForJobVisa90DaysSingleEntryIssue: 941,
        SearchForJobVisa120DaysSingleEntryIssue: 942,
        SearchForInvestmentOpportunitiesVisa60DaysSingleEntryIssue: 944,
        SearchForInvestmentOpportunitiesVisa90DaysSingleEntryIssue: 945,
        SearchForInvestmentOpportunitiesVisa120DaysSingleEntryIssue: 946,
        TourismVisa60DaysSingleEntryIssue: 919,
        TourismVisa60DaysMultipleEntryIssue: 949,
        IssueGreenResidencyVisaForInvestorOrPartner: 960,
        IssueGreenResidencyVisaForSkilledPerson: 961,
        IssueGreenResidencyVisaForFreelancers: 962,
        graduatesOfAccreditedUniversitiesOutsideUAE: 977,
        IssueResidenceandIdentityGreenResidencyForInvestorOrPartner: 917,
        IssueResidencyForGraduatesOfAccreditedUniversitiesOutsideUAENewborn: 980,
        IssueResidencyForNewBornGoldenResidencySponsorFrontLineHeroes: 985,
        IssueWorkMissionVisa90Days: 923,
        IssueResidenceAndIdentityGreenResidencyForSkilledPerson: 920,
        IssueGreenResidencyForInvestorOrPartner: 918,
        IssueGreenResidencyForSkilledPerson: 922,
        preEntryExtendVisa: 996,
        residencyAndIdentityForGraduatesOfAccreditedUniversitiesOutsideUAE: 972,
        residencyForGraduatesOfAccreditedUniversitiesOutsideUAE: 979,
        IssueGoldenResidencyAndIdentityForFrontlineHeroes: 974,
        IssueGoldenVisaForFrontlineHeroes: 978,
        IssueGoldenResidencyForFrontlineHeroes: 983,
        issueResidencyAndIdentityForGCCFamilyMemebers: 990,
        issueResidencyForGCCFamilyMemebers: 991,
        SearchForJobExtendVisa60DaysSingleEntryIssue: 997,
        SearchForJobExtendVisa90DaysSingleEntryIssue: 998,
        SearchForJobExtendVisa120DaysSingleEntryIssue: 999,
        ExtendWorkMissionVisa90Days: 1011,
        IssueGoldenResidencyAndIdentityForFamilyMemberOfGraduatesOfAccreditedUniversitiesOutsideUae: 975,
        IssueWorkVisaForInvestorOrPartner: 33,
        OtherRequestSystemReportTouristFacilitiesReportNewService: 1021,
        updateHomeAndWorkAddressInformation: 743,
        IssueVisaForHayyaCardHoldersFifa2022: 1012,
        RenewPassportFromOutsideUAE: 827,
        IssueResidenceAndIdentityForWorkFreezoneOrPrivateSectorSponsor: 498,
        IssueResidenceAndIdentityForWorkInvestorOrPartner: 886,
        RenewalResidenceAndIdentityForWorkInvestorOrPartner: 901,
        ResidencePermitsForStayingOutsideUaeOverSixMonths: 1040,
        residencyAndIdentityForeignerRetiredIssue: 868,
        ResidenceRenewalForFamilyMembersDiplomaticSponsor: 421,
        ResidenceIssuanceForFamilyMembersDiplomaticSponsor: 429,
        outsideOverStayPermitFees: 1046,
        guestExeeptionsAndHumanitarianCasesRequest: 914,
        deplomaticSponsorFile: 564,
        issueNewIDForGccCitizen: 573,
        renewIDForGccCitizen: 574,
        replaceIDCardForGccCitizen: 575,
        issueIdCardForFirstTimeForCitizen: 584,
        replaceIDCardForCitizen: 561,
        renewIDCardForCitizen: 559,
        emirateIdDataModification: 1058,
        OtherServicesSystemReportsFreeZonesReportsNewService: 1059,
        renewResiAndEidaForFamilyMembersOfTheSponsorUaeCitizen: 1017,
        renewResidencyForFamilyMembersOfTheSponsorUaeCitizen: 1018,
        VisaParentForDomesticHelper: 638,
        ResidentParentForDomesticHelper: 637,
        humanExceptionRequestService: 187,
        renewResidencyAndIdentityForVirtualWorkWorker: 1063,
        establishmentSubscribtion: 370,
        mohreWorkPackage: 1066,
        mohreWorkPackageWorkContractRatification: 1069,
        mohreWorkPackageresidencyAndIdentity: 1071,
        mohreWorkPackageWorkRenew: 1073,
        mohreWorkPackageWorkCancel: 1078,
        exceptionalCancelResidancyMohreWorkPackage: 1081,
        cancelVisaMohreWorkPackage: 1084,
        exceptionalCancelVisaMohreWorkPackage: 1087,
        mohreExceptionalCancelResidency: 1082,
        mohreExceptionalCancelVisa: 1088,
        longTermResiScientistsAndSpecialists: 1113,
        issueResiIcaForScientistsAndSpecialists: 1114,
        newBornForScientistsAndSpecialists: 1106,
        issueResidencyForScientistsAndSpecialists: 1110,
        issueResiAndEidaForFamilyMemberOfScientistsAndSpecialists: 1111,
        renewResidencyForScientistsAndSpecialists: 1108,
        issueResidencyForFamilyMemberOfHumanitarianPioneers: 1100,
        issueResiAndEidaForFamilyMemberOfHumanitarianPioneers: 1101,
        renewResidencyForFamilyMemberOfHumanitarianPioneers: 1102,
        renewResidencyForFamilyMemberOfFrontlineHeroes: 1026,
        extendVisaMultipleEntrySixMonthsToFinalizeTheProceduresOfBlueResi: 1206,
        goldenResidenceScientistsandSpecialists: 1104,
        goldenResidenceFamilyMemberofScientistsandSpecialists: 1118,
        goldenResidenceforHumanitarianPioneersIssueResidence: 1112,
        issueResiIcaForHumanitarianPioneers: 1115,
        issueResidencyWorkingForUaeCitizenOrGccCitizenSponsores: 1093,
        newBornResidencyForResidentWorkingForUaeCitizenOrGccCitizenSponsores: 1097,
        visaForResidentWorkingForUaeCitizenOrGccCitizenSponsores: 1092,
        goldenResidencyVisaForHumanitarianPioneersIssue: 1105,
        goldenVisaResidencyForFamilyMemberOfHumanitarianPioneers: 1099,
        guardianshipFileCancellation: 1119,
        residencyAndIdentityNewBornGoldenTalentedPioneers: 859,
        renewResiAndEidaForMohreWorkPackage: 1077,
        extendCourtesyVisaSixtyDays: 1016,
        extendCourtesyVisaShortStay: 1019,
        extendCourtesyVisaLongStay: 1020,
        ICAndResiNewBornsForResidentWorkingForUaeCitizenOrGccCitizenSponsores: 1098,
        renewEidaForUaeCitizenSponsorOrAgccCitizen: 1096,
        renewResidenceForUaeCitizenSponsorOrAgccCitizen: 1095,
        residenceandIdentityForeignerRetired: 1124,
        renewResidenceForeignerRetired: 1123,
        renewResidenceForRealEstateInvestor: 1125,
        renewResidenceAndIdentityForRealEstateInvestor: 1126,
        renewResidenceGoldenVisaForBusinessPioneer: 1127,
        renewResidenceAndIdentityGoldenVisaForBusinessPioneer: 1128,
        medicalExaminationRequest: 1129,
        issueResidencyAndIdentityWorkingForUaeCitizenOrGccCitizenSponsores: 1094,
        renewResidencyForGccFamilyMembers: 1023,
        nominationRequestForBlueResidence: 1131,
        sixmonthsToFinalizeTheProceduresOfBlueResidency: 1132,
        issueBlueVisaResidence: 1133,
        issueLeavePermitNewBornServiceId: 418,
        familyMemberBlueIssueVisa: 1134,
        issueBlueResidency: 1135,
        issueBlueResidencyAndIdentity: 1136,
        issueBlueResidencyAndIdentityForFamilyMembers: 1138,
        issueBlueResidencyForNewBornInsideUAE: 1139,
        issueBlueResidencyAndIdentityForNewBornInsideUAE: 1140,
        issueBlueResidencyForFamilyMembers: 1137,
        renewBlueResidencyForFamilyMembers: 1171,
        renewBlueResidencyAndIdentityForFamilyMembers: 1172,
        indiaResidenceSpecialIssueVisa60Days: 1173,
        omanResidanceMultiIssueVisa: 1175,
        medicalInsuranceForResidence: 1170,
        domesticWorkerExceptionalCancelResidecy: 1186,
        domesticWorkerExceptionalCancelVisa: 1188,
        reportsCanceledResidenceDetails: 607,
        issueSingleEntryCourtesyVisa60Days: 936,
        domesticGeneralCancel: 1207,
        domesticCancelResiBundle: 1177,
        domesticExceptionalCancelResiBundle: 1178,
        domesticCancelVisaBundle: 1179,
        domesticExceptionalCancelVisaBundle: 1180,
        issueSingleEntryCourtesyVisa60Days: 936,
        issuanceSponsorFile: 1208,
        treatmentServicePrivilege: 365,
        addNewServicesForPublicSectorEstablishment: 343,
        addNewServicesForPrivateSectorEstablishment: 344,
        eventsVisitVisa30DaysSingleIssue: 1211,
        eventsVisitVisa60DaysSingleIssue: 1213,
        eventsVisitVisa30DaysSingleExtend: 1214,
        eventsVisitVisa60DaysSingleExtend: 1215,
        eventsVisitVisa30DaysMultipleExtend: 1216,
        eventsVisitVisa60DaysMultipleIssue: 1217,
        eventsVisitVisa60DaysMultipleExtend: 1218,
        eventsVisitVisa30DaysMultipleIssue: 1219,
        issueResidencyDisasterAndWarsFamilyMember: 1210,
        issueResiAndEidaDisasterAndWarsFamilyMember: 1212,
        addRelativesFamilyMembers: 1245,
        newPassportReplacementService: 1247,
        renewPassportEidaPackage: 1248,
        shortVisitInvitationGovernmentEstablishmentsIssue: 637,
        specialEntryVisaIssue: 459,
        documentAttestationService: 1250,
        familyUnifiedFormIssuance: 1249,
        familyUnifiedFormRenewal: 1251,
        issuanceSponsorBoatsFile: 1253,
        fineReductionRequestService: 1254
    },
    eidaRefundApplicantInformationType: {
        cardReader: 1,
        otp: 2
    },
    exceptionStatus: {
        new: 1,
        approved: 2,
        valid: 5,
        used: 6
    },
    exemptionRrequestType: {
        fingerprintEnrollmentOneRequest: 16,
        fingerprintEnrollmentPermanent: 17
    },
    passportRelation: { holder: 1, accompany: 2 },
    issueVisaForInvestorOrPartner: 33,
    issueVisaForUaeCitizenSponsorOrAGccCitizen: 430,
    residenceServiceTransactions: { newRequest: 8, renew: 9, cancel: 10, modifyInformation: 62 },//service transaction id,
    visaEmploymentServiceTransactions: { newRequest: 6, cancel: 67, modifyInformation: 69, extend: 5 },//service transaction id,
    categoryTypes: { help: 1, serviceCard: 62, faq: 2 },
    queryType: { requestNumber: 1, receiptnumber: 2, bankRefernaceNumber: 3, pranNumber: 4 },
    application: { gcc: 1, TypingCenter: 2, establishment: 3, admin: 4, gcc_citizen: 7, resident: 5, citizen: 6, gccNoIdentity: 8, indianHoldAmericanGreenCard: 9, etihad: 10, mofa: 11, guest: 12, visaHolder: 14, dubaiResident: 13, residencyCancelled: 18, serviceCenters: 19, familyMemberResidencyHolder: 21, iCAEstablishmet: 15, integration: 16, mofaProtocol: 22 },
    siteContentCategoryType: 84,
    sliderCategory: 427,
    landingServiceCategory: 428,
    requestApplyOptions: { myselfWithNewInfo: 1, myselfWithOldInfo: 2, anotherExisitngApplicant: 3, anotherNewApplicant: 4 },
    attachmentCategories: { passport: 1, exception: 2 },
    attachmentTypeId: [94, 139, 158, 95, 85, 92],
    verficationTypes: { OneTimePassword: 1, personalInformation: 2 },
    emirates: { abuDhabi: 1, dubai: 2, sharjah: 3, ajman: 4, ummAlquwain: 5, rasAlkhaymah: 6, fujairah: 7 },
    draftStatus: { newDraft: 1, waitingPayment: 2, sendException: 4, approvedException: 5, rejectedException: 6, waitingFoFingerprint: 9 },
    requestActions: {
        UnderProcess: 2,
        returnedForModify: 4,
        REJECTED_TO_RECEIVE: 5,
        approved: 6,
        REJECTED: 7,
        waitingForAdminAction: 20,
        returnedFromAdmin: 21,
        cardPrintedDone: 26,
        WaitingForSubmitSignedContract: 27,
        WaitingForVisitMohreCenter: 28,
        waitingForFingerprint: 24,
        WaitingForMedicalChekResult: 29,
        InvitationForVirtualMeeting: 64,
        MeetingIsOver: 65,
        inProgress: 1,
        partialDepositRefunded: 51,
        WaitingDepositFeeCollection: 91,
        waitingForWorkVisaCompletion: 75,
        waitingForWorkVisaCompletionManual: 116,
        waitingForResidencyandIdentitySubmission: 80,
        TheVisaApplicationHasBeenSubmitted: 74,
        pendingPaymentOfWorkPermitRenewalFees: 82,
        pendingPaymentOfWorkPermitRenewalFeesManual: 117,
        waitingforMedicalScreening: 79,
        waitingForResidenceAndIdentityIssuance: 81,
        workVisaIssued: 78,
        waitingForEmployeeSignatureAuthorizationFromMOHRE: 76,
        employeeSignatureFromMOHREAuthorized: 77,
        waitingForResidenceAndIdentityRenewal: 86,
        requestCreated: 72,
        waitingforWorkPermitCancellation: 87,
        waitingPermitCancellationSigning: 103,
        waitingforVisaCancellation: 88,
        waitingForResidencyCancellation: 89,
        waitingForVisarReqCancellation: 90,
        waitingforWorkPermitCancellation: 91,
        rejectedToVisaApplicationLinked: 93,
        rejectedToResidenceApplicationLinked: 94,
        waitingForCancellationInitialApproval: 112,
        depositFeesRefunded: 14,
        waitingForResidencyandIdentitySubmissionManual: 118,
        refundApproved: 15,
        refundInProgress: 101,
        waitingForFingerprintCollection: 121, //Waiting for Fingerprint Collection last action (ID: 121) for MOHLA 2024
        waitingForPayChangeStatusFeesDW: 129,
        waitingForSendNewDomesticWorkerRequestInMohreDW: 125,
        waitingForPayVisaRequestFeesDW: 128,
        waitingForMOFAAuthorization: 141,
        WaitingForIssueMedicalInsurance: 142,
        feesRefunded: 10,
        waitingForSecurityDepositPayment: 146,
        WatingForResidencyIssue: 25,
        Completed: 148,
        InComplete: 149,
        WaitingForTheActionOfTheUser: 150
    },
    requestCancelTransaction: { visaCancel: 414, residencyCancel: 406, exceptionalResidencyCancel: 445, exceptionalVisaCancel: 490 },
    professionListType: { notGCC: 1, GCCDubai: 2, GCCNotDubai: 3 },
    serviceStatus: { Active: 9, Used: 8, Closed: 10 },
    subscriptionTransactions: { estabNew: 370, estabRenew: 371, typingCenterNew: 372, typingCenterRenew: 373, reNewFreeZoneEstablishmentSubscription: 457, typingCenterForIcaSubscription: 694, payDepositForIcaTypingCenterSubscription: 696 },
    paymentMethods: { CreditCard: 1, Amwal: 2, EDirham: 3, MOHREPayment: 4, Amwal_CreditCard: 5, skipPayment: 6 },
    insurancePolicyType: { Short: 1, Long: 2, Both: 3, AllType: 5 },
    lookupServiceStatus: { residencyNearlyExpired: 20, visaNearlyExpired: 21 },

    visaServiceStatus: { visaActive: 9, visaNearlyExpired: 21, visaExpired: 31, visaUsed: 8 },
    residencyServiceStatus: { residencyActive: 2, residencyNearlyExpired: 20, residencyExpired: 4, notConfirmed: 18 },


    extraOptionalAttachments: {
        extraAttachment1: 235, extraAttachment2: 236, extraAttachment3: 237, extraAttachment4: 238, extraAttachment5: 239,
        extraAttachment6: 491, extraAttachment7: 492, extraAttachment8: 493, extraAttachment9: 494, extraAttachment10: 495
    },
    nationality: {
        indian: 25,
        comoros: 60,
        syrian: 10,
        bangladesh: 26,
        oman: 6,
        kenyan: 71,
        ukraine: 147,
        afghanistan: 27,
        pakistan: 24,
        iran: 23,
        iraq: 7,
        uganda: 87,
        nigeria: 79,
        sudan: 19,
        vietnam: 38,
        indonesia: 43,
        thailand: 41,
        philippines: 40,
        southAfrica: 83
    },
    transactionReason: {
        visaDeadInsideCoutry: 91, residencyDeadInsideCountry: 237, sponsorDead: 355, investor: 440, seniorEmployeeWorksWithTheInvestor: 446,
        entrepreneur: 442, executiveDirectorWorkingWithTheEntrepreneur: 447, FamilyMembersInvestor: 449, FamilyMembersSeniorEmployeeWorksWithTheInvestor: 450,
        propertyInvestor: 453, seniorEmployeeWorksWithThePropertyInvestor: 454, FamilyMembersPropertyInvestor: 455,
        FamilyMembersSeniorEmployeeWorksWithThePropertyInvestor: 456, studentsWithSpecialScientificAbilities: 443, FamilyMembersPersonsWhoAreTalented: 448,
        FamilyMembersOfEntrepreneur: 451, FamilyMembersOfExecutiveDirectorWorkingWithTheEntrepreneur: 452, personsWhoAreTalented: 441,
        FamilyMembersStudentsWithSpecialScientificAbilities: 458,
        propertyOwnerInTheState: 460, ownerOfFinancialDepositInTheState: 462, ownerOfPropertyAndTheOwnerOfDepositInTheState: 464,
        propertyOwnerInTheStateForResidency: 459, ownerOfFinancialDepositInTheStateForResidency: 461,
        ownerOfPropertyAndTheOwnerOfDepositInTheStateForResidency: 463, uponSponsorRequest: 244, entrepreneurs: 444, studentsWithSpecialScientificAbilities: 445,
        monthlyIcomeMorethan20K: 471, monthlyIcomeMorethan20KResidency: 472, specialistsInThePriorityAreasOfEducation: 558, executives: 557, eliteOwners: 556,
        inventors: 555, creatorsOfThePeopleOfCultureAndArt: 554, scientists: 553, doctorsAndSpecialists: 552, resiEliteowners: 559, resiDoctorsAndSpecialists: 560, resiScientists: 561,
        resiCreativePeopleOfCultureAndArt: 562, resiSpecialistsInRelatedEducationalFields: 563, resiInventors: 564, resiExecutivesDirectors: 565, deadInsideCountry: 364,
        resiDeadOutsideCountry: 363, visaDeadInsideCountry: 420, visaDeadOutsideCountry: 421, visaSponsorDead: 407, issueFirstTime: 663,
        passportIsExpired: 664,
        passportWillBeExpiredSoon: 665,
        passportModifiedInformation: 666, passportAllPagesAreFull: 667, passportChangePhoto: 668, residentEntryPermissionOtherId: 680,
        changeIssuanceDepartment: 681,
        residentEntryPermissionFamilyId: 679,
        IssuancePasspoertForFirstTimeNew: 691,
        BringingBackToThePreviousFamily: 776,
        OpenNewStatisticalStatement: 775,
        leavePermitIsExpired: 424,
        AgeAboveOrEqual55: 801,
        ExperienceAboveOrEqual15Years: 802,
        AgeAboveOrEqual55Residency: 808,
        ExperienceAboveOrEqual15YearsResidency: 807,
        highSchoolsTopRankedStudentsInUAE: 773,
        graduatesofAccreditedUniversitiesInUAE: 774,
        holdersOfDoctorateDegrees: 726,
        newFamilyBook: 861,
        returnToPreviousFamilyBookAsFamilyMember: 862,
        residencyDepartmentChange: 869,
        newNationality: 870,
        professionChange: 871,
        passportInfoError: 872,
        personalInfError: 874,
        addressInfoError: 875,
        specialistsInElectricalEngineering: 742,
        graduatesofAccreditedUniversitiesOutsideUAE: 900,
        scientistsAndSpecialistsPresidentsAndCEO: 557,
        exceptions: 896,
        modifyPassportInformation: 994,
        updateBasicInformation: 993,
        investorsandEntrepreneursInTheFieldsOfEnvironmentEnergySustainabilityAndClimateChange: 1221

    },
    professions: { child: 7902, researcherForJob: 16879, femaleChild: 8649, notEmployed: 15153 },
    establishmentRequestType: { ISSUE_NEW_TRADE_LICENSE: 1, RENEW_TRADE_LICENSE: 3, ADD_A_COMMERCIAL_ACTIVITY: 5, ADD_A_RELATED_PERSON: 7, CONCESSION: 8, ISSUE_NEW_TRADE_LICENSE_FREEZONE: 9 },
    kofaxAuditingAttachmebntTypes: { TenancyContract: 190 },
    sponsorType: { resident: 4, investor: 1, local: 3, shaikh: 2, gcc: 5, SponsorCompany: 7, SponsorUnionGovernment: 8, SponsorLocalGovernment: 9, SponsorSemiGovernment: 10, AnimalitySponsor: 14, AgriculturalSponsor: 15, FreeZone: 13, diplomatic: 6, guardianOfTheHeirs: 18, farmSponsor: 20, estateSponsor: 21, heirsSponsors: 11, others: 17 },
    humanExceptionRequestType: { entryPermit: 1, IssueResidencyForNewBornInsideUAE: 22, refundMaxDepositLimit: 6 },
    refundMethodTypes: {
        none: 0,
        iban: 1,
        cheque: 2,
        creditCard: 3,
        bankWallet: 4
    },
    governmentSponsorTypes: { GOVERNMENT_FEDERAL: 8, GOVERNMENT_LOCAL: 9, SEMI_GOVERNMENT: 10 },
    etihadReportTypes: ["etihadARLoader", "financeAccount"],
    cancelResidencyRequestDeathAttachment: { id: 317 },
    cancelResidencyRequestDeathTransactionReasons: { deadInsideCountry: 364, deadOutsideCountry: 363, sponsorDied: 355 },
    beneficiaryDepositAccount: 11,
    bankCommissionWithDepositFees: 25,
    numberOfAllowedDraftsToBulkPay: 5,
    adminRegions: {
        abuDhabi: 1,
        sharjah: 3,
        ajman: 4,
        ummAlquwain: 5,
        rasAlkhaymah: 6,
        fujairah: 7,
        ain: 8,
        dhafra: 9,
        dubai: 27
    },
    transactionIds: { issueVisa: 9, issueResidency: 116, renewResidency: 117, issueResidencyAndIdentity: 201, renewResidencyAndIdentity: 202, issuUniversitiesColleges: 325, renewUniversitiesColleges: 368, goldenVisaNominationRequest: 1015, HireNewDomesticWorker: 1479, RenewDomesticWorkerEmployment: 1536, CancelDomesticWorkerVisa: 1526, ExceptionalCancelDomesticWorkerVisa: 1528, CancelDomesticWorkerResi: 1524, ExceptionalCancelDomesticWorkerResi: 1525 },
    citizenApplicationId: 6,
    typingCenterApplicationId: 2,
    establishmentApplicationId: 3,
    icaEstablishmentsApplicationId: 15,
    gccApplicationId: 7,
    uaeNationality: 1,
    entryStatus: {
        insideUae: 1,
        outsideUae: 2
    },
    canceledBeforeEntryId: 16,
    serviceTransactionIdCanceled: 42,
    arabicLanguageId: 1,
    passportStatus: { Active: 22, Nearly: 23, Expired: 24 },
    personalImageId: [1000095, 141, 300],
    emirateNationality: 1,
    dubaiEmirateId: 2,
    dubaiCityId: 10,
    qatarNationality: 5,
    iranNationality: 23,
    visitReason: {
        notDefined: 0,
        relationship: 369,
        property: 368,
        work: 371,
        education: 367,
        treatment: 370,
        other: 422
    },
    shipType: {
        touristShip: 14,
        woodenShips: 13,
        bicnicBoat: 15
    },
    educationLevelId: {
        illiterate: 8,    //امي
        basicStandered: 1, // تعليم اساسي
        middleLearning: 2,// تعليم متوسط
        secondery: 3,// تعليم ثانوي
        deplom: 4,
        highDeplom: 9,
        bachoular: 5,  //  باكالوريوس
        master: 6,    //ماجستير
        phd: 7,        // دكتوراه
        belowEducationAge: 260
    },
    gccNationalityId: {
        saudi: 2,
        kuwait: 3,
        oman: 4,
        qatar: 5,
        bahrain: 6,
        uae: 1
    },
    seaPortServices: {
        tourismShipsCrew: 482, // free if ship type tourism and sea port
        picnicShipsCrew: 483, // free if ship type picnic and sea port
        sailorPermitWoodenShip: 439, // free if ship type wooden and sea port
        sailorPermitOtherShip: 49, //not free alwayes
        medicalVisaHealthIssues: 47,//alwayes free for sea port
        emergencyEntry: 48, //alwayes free for sea port
        transitVisa96: 46, // alwayes with fees
        registerShip: 480,
        shipTrip: 481,
        entryShipTrip: 484,
        transfareCrew: 486,
        joinCrew: 487,
        exitShipTrip: 586
    },
    cahngeTradeName: 316,
    exceptionalEntyExitAttachments: {
        personalPhoto: 141,
        passportCopy: 158,
        relationshipCertificate: 37,
        ownershipContract: 329,
        medicalCertificate: 330,
        educationOrganizationLetter: 331,
        workOrganizationLetter: 332
    },
    familyInvestorServices: {
        issueVisa: 36,
        issueResidence: 58,
        renewResidence: 120,
        changeSponsor: 115
    },
    relationships: {
        domesticHelper: 70,
        son: 3,
        daughter: 4,
        samePerson: 68,
        parent: 1, // رب الأسرة
        father: 8,
        mother: 5,
        wife: 2,
        friendOnTheSameTrip: 18,
        husband: 19,
        sponsor: 69,
        exHusband: 49,
        husbandSon: 66,
        husbandDaughter: 60,
        wifeSon: 44,
        wifeDaughter: 45,
        brother: 6,
        sister: 7,
        grandSon: 64,
        grandDaughter: 71,
        grandFather: 47,
        grandMother: 48,
        none: 69,
        fatherHusband: 22,
        fatherWife: 20,
        motherHusband: 23,
        motherWife: 21
    },
    relativeStatus: {
        insideUae: 1,
        outSideUae: 2,
        dead: 3
    },
    healthStatus: {
        healthy: 1,
        handicapped: 2
    },
    relativeRelationshipId: 69,
    transactionReasonId: 369,
    entryPermit: 1,
    courtRequest: {
        companyTransferTtoCourtRequest: 209,
        companyTransferToCourtRequest: 207,
        individualTransferTtoCourtRequest: 206,
        visaHoldersAndResidenceHoldersTransferTtoCourtRequest: 208

    },
    cardsServiceTransactions: [152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162],//152, 153, 154, 155, 156, 157, 158(renew) - 159, 160(edit) - 161, 162(cancel)
    proCardsServiceTransactions: [152, 153, 154, 155, 159, 161],
    estabCardsServiceTransactions: [156, 157, 158, 160, 162],
    editEstablishmentCardReasons: {
        changeTradeName: 316,
        changeOwners: 313,
        licenseActivation: 312,
        changeAddress: 314,
        changeAuthorizedSignature: 315,
        other: 317,
        changeCommercialActivity: 879,
        concession: 962
    },

    residentSponsoredSonAbove18ForUnifiedFormServiceTransactions: [842, 841, 847, 846, 864, 865, 856, 887, 888, 890, 891, 892, 893, 896, 898, 843, 906, 907, 1111, 1109, 1101, 1103, 1027],
    emiratesIDServices: [496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 555, 556, 557, 558, 559, 561, 566, 570, 571, 572, 573, 574, 575, 580, 584, 585, 840, 879, 988, 1094, 1096, 1098, 1212, 852],
    gender: {
        none: 0,
        male: 1,
        female: 2,
        unkown: 3
    },
    exceptionSponsorType: {
        studyingInsideUAE: 1,
        studyingOutsideUAE: 2,
        humantarianCase: 3
    },
    maritalStatuses: {
        Dead: 0,
        Single: 1,
        Married: 2,
        Divorced: 3,
        Widowed: 4,
        DeadPerson: 5
    },
    proofOfStudyingCertificateAttachment: { id: 334 },
    etihadEventStatus: { completed: 6, new: 5, cancelled: 4, active: 2 },
    etihadPasscodeStatus: { used: 1, notUsed: 0 },
    embassiesEconomicActivity: 2037,
    OrganizationsEconomicActivity: 508,
    initialApprovalForEstablishmentLicense: 148,
    establishmentCardIssueForPrivateSectorAndFreeZone: 140,
    establishmentCardIssueForPublicSector: 139,
    AnnouncementTypes: { announcement: 2, news: 1 },
    residentOtherServicesHaveHumanitarianCase: [115, 109, 114],
    shiekhLocalResidencyServicesHaveHumanitarianCase: [56, 367, 510, 511, 884, 902, 987, 991, 986, 987, 1017, 1018, 1023],
    shiekhLocalNewBornResidencyServicesHaveHumanitarianCase: [989, 68, 988, 558, 993, 992],
    shiekhLocalVisaServicesHaveHumanitarianCase: [39, 994, 995],
    shiekhLocalIcaAndResiServicesHaveHumanitarianCase: [986, 990, 1017, 1022],
    serviceTransactions119Case: [36, 37, 38, 420, 757, 1092, 678],
    AtTheRequestOfTheSponsor: 244,
    governmentEstablishment: {
        emirateGovernment: 8,
        fedralGovernment: 9,
        semiGovernment: 10
    },
    residencyBusinessServices: {
        years10: 514,
        years5: 513,
        familyYears10: 511,
        familyYears5: 510
    },
    //ICA
    oldEmiratesIds: {
        IHaveOldEmiratesId: 9,
        INeverHadEmiratesIdBefore: 10,
        IHaveAnOldEmiratesIdButIDoNotRememberTheDetails: 11
    },
    applicantClasses: {
        GCC: 1,
        Resident: 2,
        UAECitizen: 3
    },
    country: {
        id: 1
    },
    applicantClassDetails: {
        NewResidency: 4,
        RenewForSameSponsor: 5,
        RenewForNewSponsor: 6,
        AlreadyHasResidency: 7,
        NewBorn: 8,
        CancelledResidenceHolders: 13
    },
    fileStatus: {
        cancelledResidency: 3,
        cancelledVisa: 15,
        cancelledVisaBeforeEntry: 16,
        cancelledVisaAfterEntry: 17,
        cancelledAndViolatedResidency: 26,
        violated: 5,
        expired: 31,
        aboutToExpire: 21,
        valid: 9,
        used: 8
    },
    religion: {
        islam: 1,
        christianity: 2,
        hinduism: 3,
        nonReligious: 4,
        others: 26
    },
    educationLevels: {
        primaryEducation: 1,
        lowerSecondaryEducation: 2,
        upperSecondaryEducation: 3,
        diploma: 4,
        bachelor: 5,
        master: 6,
        doctoral: 7,
        none: 8,
        highDiploma: 9,
        belowEducationAge: 260
    },
    yearsOfICA: {
        oneYear: 1,
        twoYears: 2,
        threeYears: 3,
        fiveYears: 5
    },
    establishmentPartnershipType: {
        branchOfAnotherEmirate: 3,
        branchOfTheEmirateOfAbuDhabi: 2,
        foreignBranch: 5,
        freeZonesBranch: 7,
        gulfBranch: 4,
        partnershipBetweenTwoCompaniesAndTheirBranches: 1,
        publicAndPrivateShareholdingCompaniesAndTheirSubsidiaries: 6
    },
    residencyTransactionType: {
        // This Only for Beneficiaries of Fines Exemptions
        issue: 1,
        renew: 2,
        newBorn: 3
    },
    fileServiceCode: {
        workSeekerVisa: 60,
        fiveYearTouristVisa: 112
    },
    attachmentCategory: { additionalAttachments: 3 },
    countriesOfDisastersServicesWithoutSponsor: [515, 668],
    countriesOfDisastersServicesWithSponsor: [523, 524, 525, 526, 527, 528, 669, 670, 671, 672, 673, 674],
    medicalHealthExamExpiryDateLable: "EXPIRY_DATE",
    medicalHealthExamResultLable: "MHEALTH_EXAM_RESULT_CODE",
    medicalHealthExamResultCode: { noDataFound: 0, fit: 1, unfit: 2, underProcess: 3, fitOneYear: 4, expired: 5, ageUnder18: 6 },
    familyMemberServiceId: [85, 90, 56, 105, 107, 367, 884, 902, 986, 987, 1017, 1018],
    maritalStatusId: [1, 2, 3, 4, 6, 9],
    sponsorTypeId: [2, 3],
    cancelVisaTransaction: 490,
    visaWorkseeker: 414,
    workTypes: {
        government: 1,
        Private: 2,
        retired: 3,
        student: 4,
        notWorking: 5
    },
    sponsorTypeId: {
        local: 1,
        shaikh: 0
    },
    requestTransactionTypeId: 156,
    rejectLookupLastActionId: [5, 7],
    permitCategoryType: {
        residency: 1,
        visa: 2,
        none: 11
    },
    //applicantClassCategoryType: {
    //    newResidency:0,
    //    residencyRenewal:1,
    //    changeSponsor:2,
    //    activeResidency:3,
    //    newBorn:4,
    //},
    applicationRequestType: {
        newIDCard: 1,
        renewIDCard: 2,
        replaceIDCard: 3,
        firstIDCardIssuance: 4,
        birthRegisteration: 5
    },
    applicatClassType: {
        gCC: 1,
        resident: 2,
        citizen: 3,
        expat: 12,
        newUAECitizen: 14
    },
    newBornParentServiceTransactionId: 474,
    newBornGoldenResidencyParentServiceTransactionId: 712, //Parent service for golden residency (New Born)
    icaAndResiNewBorn: 672,
    newbornsInsideTheUAEAreGuarantorsOfGoldenResidency: 743,
    eidaServices: {
        issueNewIDForCitizen: 560, // هوية مواطن - تجديد هوية
        renewIDForCitizen: 559, // هوية مواطن - إصدار هوية جديدة
        replaceIDCardForCitizen: 561, // هوية مواطن - بدل فاقد
        // damagedIDForCitizen: 562, // هوية مواطن - بدل تالف--deleted
        issueNewIDForResident: 50061, // هوية مقيم - تجديد هوية
        renewIDForResident: 50062, // هوية مقيم - إصدار هوية جديدة
        lostIDForResident: 500610, // هوية مقيم - بدل فاقد
        damagedIDForResident: 500644, // هوية مقيم - بدل تالف
        issueNewIDForGccCitizen: 573, // هوية مقيم خليجي - تجديد هوية
        renewIDForGccCitizen: 574, // هوية مقيم خليجي- إصدار هوية جديدة
        replaceIDCardForGccCitizen: 575, // هوية مقيم خليجي- بدل فاقد
        //  damagedIDForGccCitizen: 576 // هوية مقيم خليجي- بدل تالف--deleted
        citizensFirstTimeIssue: 584, // خدمات الهوية الإمارتية – المواطنين – إصدار هوية لأول مرة - إصدار
        citizensNewbornRegistertion: 585, //خدمات الهوية الإماراتية - المواطنين - مولود جديد - تسجيل
        familyMembersPrivateSectorOrFreeZoneResidencyAndIdentityRenewal: 505,//إقامة وهوية - أفراد أسرة كفيل - يعمل في القطاع الخاص او منطقة حرة - تجديد إقامة وهوية
        familyFembersInvestoroOrPartnerResidencyAndIdentityRenewal: 507,//إقامة وهوية - أفراد أسرة كفيل - مستثمر أو شريك - تجديد إقامة وهوية
        familyMembersWorkingInPublicSectorResidencyAndIdentityRenewal: 503////إقامة وهوية - أفراد أسرة كفيل - يعمل في قطاع حكومي - تجديد إقامة وهوية       
    },
    eidaReplacmentType: {
        lostID: 1,
        damagedID: 2,
        dataUpdate: 3
    },
    serviceTransactionId: {
        issue: 437,
        renew: 438
    },
    newBornEidaServiceTransactionId: 556,
    attachmentTypes: {
        supportingDocument: 384,
        passport: 158,
        passportForIca: 92,
        passportForEida: 94,
        proofOfExemption: 306,
        emirateIdFrontSide: 350,
        emirateIdBackSide: 351,
        sponsorPassport: 134,
        sponsorPassportForEida: 166,
        sponsorResidency: 169,
        fatherResidency: 346,
        residency: 347,
        entryVisa: 7,
        entryVisaForEida: 284,
        birthCertificate: 165,
        emirateIdentityForm: 45,
        emirateIdentityAndReceipt: 70,
        workContract: 197,
        disabilityCertificate: 345,
        coloredPersonalPhoto: 141,
        leaveTravelTicket: 336,
        mohreCancellationLetter: 471,
        laborCard: 472,
        policeReport: 473,
        proofOfOwnershipOfTheProperty: 486, //إثبات ملكية العقار
        proofOfFinancialDeposit: 487, //إثبات الوديعة المالية
        proofOfDaughterNotMarried: 79, // إثبات عدم الزواج في حالة كفالة الأبنة الأكبر من 18 عام this was id = 490 but after attachment mapping new Id = 79
        fatherPassport: 349,
        fatherIdCardBackSide: 359,
        fatherMotherGCCID: 581,
        fatherIdCardFrontSide: 348,
        monthlyIncomeProof: 485, //شهادة إثبات الدخل الشهري
        socialPensionCertificate: 356,
        sponsorSalary: 567,
        IdFromGccCountry: 529,
        IdFromGccCountryForGuardian: 634,
        BankAccountProof: 579,
        policeClearanceCertificateSecondPage: 316, // حسن سلوك
        policeClearanceCertificateFirstPage: 315, // حسن سلوك
        gccIDForApplicantOrApplicantFather: 618,
        gccPassportForDeceasedCitizen: 546,
        gccEmiratesIDForDeceasedCitizenFrontFace: 547,
        gccEmiratesIDForDeceasedCitizenBackFace: 573,
        eDirhamReciept: 665, //إيصال الدرهم الإلكتروني
        diplomatePassport: 666,
        copyOfDiplomateCard: 667,
        acquaintanceForm: 702,
        birthCertificateForNewborn: 414,
        passportCopyOfChildFirstPage: 415,
        passportCopyOfNewbornUnifiedNumberPage: 416,
        uaeFamilyBookAllPages: 357,
        newPassport: 743,
        tenancyContract: 190,
        lostPassport: 662,
        damagedPassport: 756,
        employmentContract: "197",
        medicalFitnessTestResult: 338,
        emirateIdForSponserdFrontSide: 780,
        emirateIdForSponserdBackSide: 781,
        medicalFitnessTestResult: 338,
        copyOfTheNewTradeLicense: 462,
        copyOfTradeLicense: 149,
        qualificationCertificate: 803,
        beneficiaryBirthCertificate: 817,
        attestedMarriageCertificate: 816,
        certificateOfGoodConductAndBehavior: 829,
        salaryCertificate: 119,
        emiratesIdApplication: 339,
        identityCardOrReceipt: 70,
        identityReceipt: 45,
        identityCardReceipt: 814,
        copyOfContractForNewWorkWhichContainsProfessionAndSalary: 291, //صورة عقد (عرض ) العمل الجديد على ان يحتوي المهنة والراتب
        etihadTourGuide: 832,
        outsidePermitExemptionProof: 837,
        certificateOfCancelationFromThemCompanySealedAndSignedForCurrentSponsor: 290,//  شهادة الغاء من الشركة (الكفيل الحالي) موقعة ومختومه (إجباري)
        proofOfKinship: 37,
        headOfFamilyProofOfKinship: 788,
        copyOfRelativeID: 840,
        familyHeadPassport: 792,
        familyHeadIdCardFrontSide: 791,
        familyHeadIdCardBackSide: 796,
        bankAccountBroofForExceptional: 597,
        emiratesOdCardCopyForSponsorFrontFace: 774,
        emiratesOdCardCopyForSponsorbackFace: 775,
        originalEntryPermission: 994,
        proofOfNonMarrigeEledestDaughter: 490,
        proofOfBeneficiaryResidenceInSponsorCountry: 818,
        copyOfHealthyInsurance: 245,
        medicalExamination: 24,
        additionalAttachmentNo1: 235,
        additionalAttachmentNo2: 236,
        additionalAttachmentNo3: 237,
        additionalAttachmentNo4: 238,
        additionalAattachmentNo5: 239,
        supportDocumentsForBlueResidencyEligibility: 996,
        issueLeavePermitNewBorn: 259,
        letterFromGovernmentSponsorAboutTheEscapeReport: 249,
        letterFromSponsorCompanyAboutTheEscapeReport: 251,
        notificationOfEscapeFromTheMinistryOfHumanResourcesAndEmiratization: 252,
        bankGuarantee: 253,
        establishmentCard: 250,
        copyOfNewPassport: 323,
        deadCertificate: 317,
        WifeBirthCertificate: 281,
        HusbandPassport: 391,
        WifePassport: 392,
        BirthCertificateOfTheHusband: 393,
        CertificateOfLastAcademicQualificationOfTheHusband: 986,
        CertificateOfLastAcademicQualificationOfTheWife: 987,
        contractDetail: 1361,
        CertificateToWhomItMayConcernFromTheEmployerOfTheWife: 412,
        CertificateOfMarriageCont: 1408,
        CertificateToWhomItMayConcernFromTheEmployerOfTheHusband: 1409
    },
    sponsorStudyStatus: {
        finishedSecondarySchool: 1,
        studyingInUniversity: 2,
        finishedUniversity: 3
    },
    finishedStudyingInsideUAEAttachmentTypes: {
        certificateOfStudyCompletion: 360,
        certificateOfStudyUniversityCompletion: 361,
        certificateOfContinuigStudyFromTheUniversity: 117
    },
    dubaiResidentsModuleTransactions:
    {
        issueId: 206,
        renewId: 213,
        replaceId: 214
    },
    exemptionsFeesType: {
        fineFees: 34,
        issueFees: 32,
        serviceFees: 33,
        socialPensionExemption: 13,
        fastTrackFees: 38
    },
    exemptionsFees: {
        fineFees: 2,
        issueFees: 0,
        serviceFees: 1,
        fastTrackFees: 3,
    },
    exemptionsFeesArray: {
        issueFeesArrayId: 0,
        serviceFeesArrayId: 1,
        fineFeesArrayId: 2,
        fastTrackFeesArrayId: 3,
    },
    exemptionLookups: {
        specialNeedsAndAutism: 14,
        infectiousDiseaseOrProlongedBedRest: 6,
        PartialOrTotalDisabilityOrBedriddenWithIllness: 8
    },
    // new integ external system id
    eidaExternalSystemId: 7,
    UDBExternalSystemId: 1,
    eidaUDBExternalSystemId: 33,
    oneClickServiceExternalSystemId: 36,

    icaExemptionsServiceTransId: 566,
    workJourneyTransId: 579,
    supportAttachmentsForExemptions: {
        supportAttachment1: 385,
        supportAttachment2: 421,
        supportAttachment3: 422,
        supportAttachment4: 423,
        supportAttachment5: 424
    },
    wifeOrHusbandType: {
        citizenWife: 1,
        residentWife: 2,
        residentHusband: 3
    },
    gCCCitizen: [1, 2, 3, 4, 5, 6],
    mainDepartments: {
        alAin: 28,
        bidaZayed: 37,
        abuDhabi: 17,
        dubai: 8
    },
    familyBookRemoveDueToDivorceEventResult: {
        openNewStatisticalStatement: 1,
        returnToThePreviousFamily: 2
    },
    lookupDivorcedNewFBTypes: {
        OpenNewStatisticalStatement: 1,
        ReturnToThePreviousFamily: 2
    },
    trackedServices: [476, 478, 479, 545],
    longTermResidencyId: [599, 600, 601, 602, 613, 615, 640, 646, 660, 661, 665, 667, 754, 756, 916, 1113, 1112],
    longTermResidencyFamilyMembersIds: [611, 612, 614, 615, 616, 656, 657, 658, 659, 662, 676, 677, 686, 687, 688, 689, 690, 665, 756, 660, 661, 771, 772, 773, 774, 775, 776, 777, 778, 667, 820, 980, 985, 1106, 1110, 1108, 1100, 1102, 1116, 1026],
    longTermResidencyFamilyMembersIdsHideApplicantEID: [599, 600, 601, 602, 613, 640, 754, 1113, 1112],
    longTermResidency5Years: [600, 601, 613, 614, 615, 616, 656, 657, 659, 640, 661, 667, 677, 687, 688, 689, 774, 775, 777, 773, 641, 916],
    longTermResidency10Yers: [599, 602, 611, 612, 646, 658, 660, 662, 665, 676, 686, 690, 754, 756, 771, 776, 778, 772, 820, 985, 980, 1113, 1106, 1110, 1108, 1100, 1102, 1116, 1112, 1026],
    longTermUnifiedFormFamilyMembersIds: [867, 842, 841, 846, 843, 865, 856, 864, 898, 888, 893, 891, 887, 892, 896, 890, 1109, 1103, 1027],
    longTermUnifiedFormId: [865, 864, 856],
    numberOfYears: {
        oneYear: 1,
        twoYear: 2,
        threeYear: 3,
        fourYear: 4,
        fiveYear: 5,
        tenYear: 10
    },
    individualApplication: [1, 2, 3, 5, 6, 7, 14, 15, 8, 18, 20, 13, 19, 21],
    visaHolderApplicationId: 14,
    samePersonRelationshipId: 68,
    citizensCertificationService: 78,
    residentCertificationService: 79,
    gccCitizensCertificationService: 1057,
    renewEstablishmentCardServices: [156, 157, 158],
    renewDelegateCardServices: [152, 153, 154, 155],
    freeZonesAuthority: 3,
    portTypes: { landPort: 1, seaPort: 2, airPort: 3 },
    establishmentRequestActionType: {
        newEstablishment: 1,
        ExistingEstablishment: 2
    },
    userIdentificator: {
        unifiedNumber: 1,
        fileNumber: 2,
        identityCardNumber: 3
    },
    applicationServerPublicKey: 'BHX9rf59mUUPSD5OQlGd98xpiKiL1Ufzl5v48JEqAeNICJCmEwlh1e_b1qURKRf2uEYj2kgcvf9-QCdgqxBcmIU',
    enableBrowserNotification: false,
    gccServiceForIssueVisa: { issueForSingleVisa: 42, issueForFamilyGroup: 377 },
    addressTypes: { local: 1, abroad: 2 },
    addressClasses: { home: 1, delivery: 2 },
    addressCategory: { local: 1, abroad: 2, delivery: 3, deliveryPassport: 4 },
    addressFormType: { grid: 1, entry: 2 },
    tahalufEstablishmentId: 1841,
    creationMethod: { primary: "primary", secondary: "secondary" },
    transactionTypes: { issueVisa: 9, extendVisa: 11, issueVisaForFamilyGroup: 176 },
    skillLevels: { university: 1, secondary: 2, diploma: 3 },
    certificationAttachments: { attachment1: 478, attachment2: 479, attachment3: 480, attachment4: 481, attachment5: 482, attachment6: 483 },
    universityCertificateAttachments: { page1: 478, page2: 479 },
    secondarySchoolCertificateAttachments: { page1: 480, page2: 481 },
    diplomaCertificateAttachments: { page1: 482, page2: 483 },
    accountType: { establishment: 3, TypingCenter: 2, individual: 1 },
    icaServiceTransactions: [496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 530, 555, 556, 557, 558, 559, 560, 561, 562, 566, 570, 571, 572, 573, 574, 575, 576, 580, 584, 585, 663, 735, 736, 737, 738,
        840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 906, 907, 909, 986, 988, 971, 984, 1017, 1114, 1107, 1111, 1109, 1101, 1103, 1115, 1117, 1094, 1096, 1098, 1027, 1212],
    icaServiceAllowReplicatedImage: [0],
    noneRelationshipId: 69,
    residencyTransactionIds: { issueResidency: 437, renewResidency: 438 },
    gCCCitizenResidencyIdentityIssuanceServiceTransId: 558,
    issueResidencyServices: [57, 58, 59, 116, 437, 758, 685, 657, 656, 662, 661, 660, 659, 658, 769, 681, 677, 756, 690, 689, 688, 687, 686, 667, 665, 641, 768, 676, 820, 568, 515, 801, 599, 754, 758, 640, 727, 765, 760, 613, 563, 602, 601, 600, 516, 56, 66, 67, 775, 772, 628, 778, 774, 776, 773, 759, 777, 129, 771, 627, 569, 130, 367, 866, 869, 884, 902, 867, 986, 987, 985, 980, 991, 982, 981, 943, 935, 938, 948, 955, 959, 421, 1113, 1106, 1110, 1108, 1100, 1102, 1116, 1112, 1093, 1026, 1210],
    renewResidencyServices: [120, 121, 122, 117, 438, 759, 775, 772, 778, 774, 776, 773, 777, 771, 894, 369, 627, 367, 569, 896, 916, 1018, 1023, 429, 668, 1108, 1102, 1095, 1026],
    exceptionalParentsAndBrothersHumanCaseServices: [755, 645, 756, 656, 777, 778, 842, 896, 856, 890],
    exceptionalRelationsWithOutHumanCaseService: [642, 867, 915, 641, 916],
    changeUsername: {
        validateType: { check: 1, validateOtp: 2, email: 3, sms: 4, changeEmail: 5, forgetPassword: 6, changeUsernameAndPassword: 7, showMobileNumber: 8, visaHolder: 9 },
        typeOfChange: { sms: 1, email: 2, registeredMobile: 3 }
    },
    //Eida Gcc :: Start
    gccClassifications: {
        frequentForNewIssue: 492,
        frequentForRenewIssue: 522,
        residentForNewIssue: 493,
        residentForRenewIssue: 523
    },
    gccCategories: {
        bordersAreasResidentsForNewIssue: 494,
        bordersAreasResidentsForRenewIssue: 524,
        craftsmenForNewIssue: 495,
        craftsmenForRenewIssue: 525,
        familiesForNewIssue: 511,
        familiesForRenewIssue: 541,
        visitorsForNewIssue: 496,
        visitorsForRenewIssue: 526,
        prisonersForNewIssue: 510,
        prisonersForRenewIssue: 540,
        studentsForNewIssue: 505,
        studentsForRenewIssue: 535,
        employeesForNewIssue: 506,
        employeesForRenewIssue: 536,
        investorForNewIssue: 507,
        investorForRenewIssue: 537,
        realEstateOwnerForNewIssue: 508,
        realEstateOwnerForRenewIssue: 538,
        scholarshipDelegatesForNewIssue: 509,
        scholarshipDelegatesForRenewIssue: 539,
        guardianForNewIssue: 513,
        guardianForRenewIssue: 543
    },
    gccTypeCode: {
        studentsFamilyForNewIssue: 514,
        studentsFamilyForRenewIssue: 544,
        employeesFamilyForNewIssue: 515,
        employeesFamilyForRenewIssue: 545,
        investorFamilyForNewIssue: 516,
        investorFamilyForRenewIssue: 546,
        realEstateOwnerFamilyForNewIssue: 517,
        realEstateOwnerFamilyForRenewIssue: 547,
        deadCitizenFamilyForNewIssue: 518,
        deadCitizenFamilyForRenewIssue: 548,
        expatFamilyForNewIssue: 519,
        expatFamilyForRenewIssue: 549,
        citizenFamilyForNewIssue: 520,
        citizenFamilyForRenewIssue: 550,
        emiratesPassportHoldersFamilyForNewIssue: 521,
        emiratesPassportHoldersFamilyForRenewIssue: 551,
        agencyGuardianStewardshipForNewIssue: 685,
        agencyGuardianStewardshipForRenewIssue: 688,
        gccCuddledForNewIssue: 686,
        gccCuddledForRenewIssue: 689,
        gccBrooderForNewIssue: 687,
        gccBrooderForRenewIssue: 690
    },
    gccCategoriesUnder21List: [494, 524, 495, 525, 496, 526, 505, 535, 506, 536, 507, 537, 508, 538, 509, 539, 510, 540, 513, 543],
    gccStudentsAttachmentIds: [631, 619, 620],
    gccEmployeesAttachmentIds: [197, 560, 621, 622, 623],
    gccInvestorAttachmentIds: [226, 624, 625, 626],
    gccRealEstateOwnerAttachmentIds: [632, 486, 627, 628],
    gccScholarshipDelegatesAttachmentIds: [533, 629, 630],

    //Eida Gcc :: End
    icaRefundattachment: {
        bankInformation: 566,
        visaOrResidencyCopy: 561,
        applicantEmiratesIdFrontEnd: 562,
        ApplicantEmiratesIdBackEnd: 563,
        applicantRelationEmiratesIdFrontEnd: 564,
        applicantRelationEmiratesIdBackEnd: 565
    },
    RefundFeesType: {
        fineFees: 34,
        issueFees: 32,
        serviceFees: 33
    },
    RefundFeeType: {
        fineFees: 2,
        issueFees: 0,
        serviceFees: 1
    },
    dubaiEidaCardDurationIds: [1, 2, 3, 4, 5],
    eidaCardDurationId: {
        oneYear: 1,
        twoYears: 2,
        threeYears: 3,
        fiveYears: 4,
        tenYears: 5,
        fourYears: 6,
        sixYears: 7,
        sevenYears: 8,
        eightYears: 9,
        nineYears: 10
    },
    eidaCardDurationCode: {
        oneYear: 1,
        twoYears: 2,
        threeYears: 3,
        fiveYears: 5,
        tenYears: 10,
        fourYears: 4,
        sixYears: 6,
        sevenYears: 7,
        eightYears: 8,
        nineYears: 9
    },
    jobException: 54,
    icaRefundServiceTransId: 663,
    refundReasonCategories: {
        depositOfSponsorshipFileForCitizens: 5,
        eidaServicesDepositRefund: 6,
        depositOfSystemRegistration: 7,
        eidaIdCardRequestRejected: 711,
        depositOnSponsorFileForEstateOrFarm: 571,
        depositForFinesCategory: 1004,
        depositOfVisitVisa: 578,
    },
    seaPortServicesNeedRequest: [484, 486, 586, 517],
    tradeLicenseStatus: {
        abuDhabiCancelled: 'C',
        ajmanAbrogatedCancelledRevoked: '3',
        ajmanAdministrativeCancellation: '6'
    },
    additionalDepositType: {
        humanitarianSituations: 4,
        familyMembersOfAnInvestor: 6,
        circulars: 8,
        openLocalSponsorFileDeposit: 9
    },
    parentService: { sponsorFile: 883 },
    periodAfterEntryTypeIds: { years: 4 },
    deliveryMethod: { ToNearlyCenter: 1, DoorToDoor: 2 },
    deliveyCompany: { EmiratePost: 1, Tawzea: 2, Zajel: 3, Amer: 4 },
    insurancepolicy: { adnic: 15, dhafra: 50, shory: 53 },
    newBornResidency: [686, 687, 688, 689, 690, 68, 69, 70, 71, 423, 568, 676, 677, 681, 685, 760, 760, 820, 989, 985, 980, 993, 1055, 1106, 1116, 1097],
    icaTypingCenterMainUserAttachments: { emiratesID: 447, workPermit: 78, laborCard: 472 },
    uaePorts: { abuDhabiInternationAirport: 4, dubaiInternationAirport: 13, sharjahInternationAirport: 19 },
    personCategories: { resident: 1, leavepermit: 4 },
    exemptionClassType: { Disabled: 1, Diplomate: 2, SocialPension: 3 },
    icaAndResiServiceTransactions: [496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 555, 556, 557, 558, 566, 530, 988, 1094, 1096, 1098, 840, 879, 1212, 852],
    uae: 1,
    disabilities: {
        other: 1
    },
    notWorkingProfessions: {
        STUDENT: 8335,
        FSTUDENT: 6951,
        STUDENT_IN_UNIVERSITY: 10039,
        HOUSE_WIFE: 10838,
        RETIRED: 15152,
        NOT_EMPLOYED: 15153,
        CHILD: 7902,
        FCHILD: 8649
    },
    alertTemplateType: {
        alertExpiredResidency: 200,
        alertExpiredVisa: 201,
        alertExpiredEID: 202,
        alertExpiredPassport: 203,
        alertExpiredEstablishmentCard: 204,
        alertExpiredDiplomaticCard: 205,
        alertExpiredPROCard: 206,
        alertResidenceModification: 279
    },


    issuePassportTransactionReasons:
    {
        issuancePassportForFirstTimeNew: 691,
        changeIssuanceDepartment: 681,
        changeOfPersonalPicture: 668,
        issueFirstTime: 663,
        modifyData: 666,
        pagesAreFull: 667,
        passportIsAboutToExpire: 665,
        passportIsExpired: 664,
        passportDamaged: 670,
        passportLost: 669,
        replacePassportDataError: 1284


    },
    visaHolder5YearsResidencyServices: [600, 601, 613, 640, 922, 918],
    visaHolder10YearsResidencyServices: [599, 602, 754, 1113, 1112, 1135],
    visaHolderLongTimeVisaServices: [632, 633, 634, 635, 636, 639, 753, 1104, 1105],
    longTermVisaServiceId: {
        ENTREPRENEUR: 847,
        INVESTOR_IN_PUBLIC_INVESTMENTS: 845,
        INVESTOR_IN_REAL_ESTATE: 846,
        PERSONS_WHO_ARE_TALENTED: 848,
        STUDENTS_WITH_SPECIAL_SCIENTIFIC_ABILITIES: 849,
        FOREIGNER_RETIRED: 852,
        GOLDEN_VISA_RESIDENCY_10_YEARS_GRADUATES_ACCREDITED_UNIVERSITIES: 928,
        SIX_MONTHS_TO_FINALIZE_THE_PROCEDURES_OF_GOLDEN_RESIDENCY: 826,

        VISA_SCIENTISTS_AND_SPECIALISTS: 1163,
        RESI_SCIENTISTS_AND_SPECIALISTS: 1168,
        RESI_SCIENTISTS_AND_SPECIALISTS_FOR_SPONSOR: 1171,
        VISA_HUMANITARIAN_PIONEERS: 1164,
        RESI_HUMANITARIAN_PIONEERS: 1161,
        RESI_HUMANITARIAN_PIONEERS_FOR_SPONSOR: 1170
    },
    longTermVisaServiceIdsEligablieToResidency: [847, 845, 846, 848, 849, 928],
    establishmentSubscriptionDepositReason: {
        establishmentChangeType: 1,
        semiGovType: 2
    },
    empostShipmentStatus: {
        returnedToStock: 12
    },

    errorType: {
        error: 1,
        warning: 2,
        info: 3,
        note: 4
    },

    bundleServiceStatus: {
        completed: 1,
        applicable: 2,
        penidng: 3,
        inProgress: 4
    },

    applicaitonBundles: {
        family: 1,
        newBorn: 2,
        work: 3
    },

    establishmentAccountTypes: {
        toursim: 2,
        freeZone: 3,
        childFreeZone: 5,
        holding: 4,
        childHolding: 6
    },

    countriesId: {
        //Country Id not Country Code
        UAE: 1, //الإمارات
        InternationalWaterBorder: 257, //المياه الدولية
        RegionalWaterBorder: 258 //المياه الاقليمية
    },

    goldenFilesServiceIds: {
        TenYearsResidency: {
            GeneralInvestors: 825,
            PersonsWhoAreTalented: 822,
            graduatesOfAccreditedUniversitiesInUAE: 929
        },
        FiveYearResidency: {
            realEstateInvestor: 834,
            Entrepreneur: 824,
            HighSchoolTopRankedStudentsInUAE: 823
        },
        ResidencyVisa: {
            GeneralInvestors: 845,
            PersonsWhoAreTalented: 848,
            graduatesOfAccreditedUniversitiesInUAE: 928,
            realEstateInvestor: 846,
            Entrepreneur: 847,
            HighSchoolTopRankedStudentsInUAE: 849
        },
        finalizeTheProceduresOfGoldenResidency: 826
    },
    eidaIdentificator: {
        unifiedNumber: 1,
        identityNumber: 2,
        fileNumber: 3,
        passportInformation: 4,
        diplomateCardNumber: 5
    }, shipPassengerStatus: {
        New: 1,
        Pending: 2,
        Approved: 3,
        RejectedAttachePledgetoNoDisembark: 4,
        returned: 5,
        Cancelled: 6,
        Incomplete: 7,
        ReSubmited: 8,
        Rejected: 9,
        RejectThepledgehasbeenattached: 10
    },
    PassengerType: {
        Captain: 1,
        Passenger: 3,
        CrewMember: 2
    },
    PassportTypes: {
        OrdinaryPassport: 1,
        DiplomaticPassport: 2,
        TemproryPassport: 3,
        NauticalPassport: 4,
        PrivatePassport: 5,
        AssignmentPassport: 6,
        TravelDocument: 7,
        PersonalIdentity: 8,
        EidaCard: 9,
        SyrianTravelDocument: 13,
        EgyptianTravelDocument: 15,
        OrdinaryOneDayPassportMissionPassport: 14,
        LebanseTravelDocument: 16,
        QatariTravelDocument: 19,
        BahrainiTravelDocument: 22,
        IraqiTravelDocument: 17,
        YemeniTravelDocument: 18,
        SaudiTravelDocument: 20,
        KuwaitTravelDocument: 21,
        OmanTravelDocument: 23,
        OfficialPassport: 24,
        ServicePassport: 25,
        ForeignPassport: 28,
        EmergencyPassport: 29,
        Return: 26,
        UNPassport: 27
    },
    depertmentCode: { abuDhabi: 101, dubai: 201 },
    FamilyRelationCategories: {
        Parents: 1, //الوالدين
        Relatives: 2,//الاقارب
        friends: 3,//الاصدقاء
        Breadwinner: 4,//المعيل
        WifeAndSons: 5//زوجة و ابناء

    },
    humanExceptionStatus: { InsideCountry: 1, OutsideCountry: 2, NewBornInsideCountry: 4 },
    subscripUserStatus: {
        underProcessing: 1,
        accepted: 2,
        reject: 3,
        incomplete: 4
    },
    courtRequestsNotAllowedServiceIds: [739, 208, 206, 209, 207],
    virtualResidencyServices: [765, 768, 769, 869],
    renewResidenceForFamilyMemberLongTerm: [771, 772, 773, 774, 775, 776, 777, 778, 1108, 1102, 1026],
    renewResidenceForFamilyMemberLongTerm10Years: [771, 776, 778, 772, 1108, 1102, 1026],
    renewResidenceForFamilyMemberLongTerm5Years: [774, 775, 777, 773],
    professionsNotNeedWorkPlace: {
        child: 7902,
        femaileChild: 8649,
        unauthorizedHouseWife: 10838,
        unauthorizedStudent: 8335,
        muhrem: 15852,
        NotEmployed: 15153,
    },
    virtualResidencyVisaServices: [763, 764],
    channelSource: { web: 1, mobile: 2 },
    gradeTypes: {
        percentageGrade: 1,
        numericOutOf4: 2
    },
    roadCities: [1, 2, 3],
    transactionReasons: { ageOlderOrEqual55: 801, experienceMoreThanOrEqual15Years: 802, divorced: 940 },
    talentedPeopleNotRequireWorkplace: [724, 725, 726, 727, 816, 948, 947, 946, 945, 944, 930, 931, 932, 933, 929],
    guestGoldenResidencyServices: [801],
    guestServicesReportsWithEmail: [765, 788, 793, 795, 796, 797, 798, 799, 830],
    issuePassportReasonForOutsideUAECitizen:
    {
        isAboutToExpire: 818,
        isExpired: 817

    },
    majoringForNominationRequest: {
        engineeringTechnology: 77,
        medicineLifeciences: 78,
        naturalSciences: 79,
        artsAndHumanities: 80,
        socialScience: 81,
        management: 82
    },
    language: {
        arabic: 1,
        english: 2
    },
    exceptionalTypes: {
        FingerprintEnrolmentOneRequest: 16,
        FingerprintEnrolmentPermanent: 17,
        PersonalPhotoVerificationIcaoOneRequest: 18,
        PersonalPhotoVerificationIcaoPermanent: 19,
        IcaoElderlyPassportOfCitizensOneRequest: 31,
        IcaoElderlyPassportOfCitizensPermanent: 32,
        exceptionToExemptNewbornRequestFromBirthCertificateNumber: 48
    },
    establishmentCardIssuingServices: [139, 140, 141, 142],
    applicationsRequiresCheckLeaseContract: [5], // only resident -- maybe 6 (citizen) & 7 (Gcc Citizen) will be added
    estabEmployeeTypes:
    {
        Owner: 1,
        Delegate: 7,
        Authorized: 8,
        Partner: 5,
        Sponsor: 9
    },
    eidaRenewalReasons: {
        ResidencyRenewal: 980,
        UseTheResiPeriodForEID: 979
    },
    goldenVisaEligilibityCode: "golden_visa_check_eligibility_faq",
    allowedApplicationsForTawzeeChanges: [5, 6, 7, 14, 21],
    allowedApplicationsForZajelChanges: [13, 6],

    renewUnifiedFormForFamilyMemberLongTerm: [898, 888, 893, 891, 887, 892, 896, 890, 1109, 1103, 1027],
    renewUnifiedFormForFamilyMemberLongTerm10Years: [888, 898, 890, 892, 1109, 1103, 1027],
    renewUnifiedFormForFamilyMemberLongTerm5Years: [893, 896, 887, 891],
    issueEidaForFamilyMemberHumanitarianCase: [842, 841, 847, 846, 843, 865, 864, 859, 856, 872, 896, 971, 984, 1107, 1111, 1101, 1117],
    issueEidaForFamilyMember: [841, 843, 844, 845, 846, 847, 1111, 1101],
    eidaServicesForFamilyMembers: [841, 842, 843, 846, 847, 864, 865, 898, 888, 893, 891, 887, 892, 896, 890, 1111, 1109, 1101, 1103, 1027],
    mobileAppAuthorizationStatus: {
        Pending: 1,
        Approved: 2,
        Rejected: 3,
        Expired: 4,
        Canceled: 5
    },
    icaResiServicesWithTranactionReason: [855, 1114, 1115],
    icaServicesRelatedToLongTermResidency: [844, 845],
    icaServicesRelatedToOneYearResidency: [867],
    residencyAndUnifiedFormServicesForCitizenSponsor: [986, 987, 988, 989, 1017, 1018],
    newBornServiceTransactionIds: [557, 556, 555, 1098, 840, 852],
    companionNumberForVisa: [10, 450, 2, 448, 482, 439, 783, 25, 22, 17, 452, 455, 6, 449, 454, 547, 546, 711, 785, 552, 50, 551, 550, 380, 378, 784, 384, 382, 381, 379, 464],
    whiteListType: {
        invalidEconomicActivities: 1,
        expiredEstablishment: 2,
        mobileAuthorization: 3,
        servicesDelegation: 4
    },
    sponsoredCategoryType: {
        allSponsoreds: 1,
        violatorsOnly: 2,
        nonViolatorsOnly: 3
    },
    fileStatusType: {
        all: 4,
        onlyActiveSponsoreds: 5,
        onlyCanceledSponsoreds: 6
    },
    escapeReportsStatusType: {
        all: 7,
        haveEscapeReports: 8,
        noHaveEscapeReports: 9
    },
    establishmentCancellationReasons: {
        establishmentSubscriptionCancellationId: 868,
        cancellationOfTheEstablishmentsAffiliationWithTheFreeZone: 867
    },
    residencyWithOneYearWithUnifiedForm: [840, 848, 852, 853, 867, 869, 873, 879, 883, 889, 895, 899],
    residencyWithFiveYearWithUnifiedForm: [841, 842, 844, 846, 854, 858, 864, 875, 876, 877, 881, 882, 891, 893, 896, 868, 850, 860, 861, 862, 867, 915],
    residencyWithTenYearWithUnifiedForm: [843, 845, 847, 851, 855, 857, 856, 865, 878, 880, 887, 888, 890, 892, 898, 859, 871, 863, 872, 974, 972, 975, 970, 1114, 1107, 1111, 1109, 1101, 1103, 1117, 1115.1027],
    unifiedFormIssueServicesWithHumanitarianCases: [841, 842, 843, 846, 847, 851, 856, 858, 864, 865, 866, 867, 869, 875, 876, 878, 879, 884, 896, 907, 1111, 1101],
    unifiedFormRenewServicesWithHumanitarianCases: [887, 888, 889, 890, 891, 892, 893, 894, 896, 898, 900, 902, 906, 1109, 1103, 1027],

    residentNewBornResidencyServicesHaveHumanitarianCase: [69, 70, 71, 423, 555, 556, 557, 568, 676, 677, 681, 685, 686, 687, 688, 689, 690, 727, 760, 769, 820, 840, 848, 849, 850, 852, 859, 860, 861, 862, 863, 870, 871, 872, 874, 947, 948, 953, 955, 958, 959, 971, 980, 984, 985, 1044, 1045, 1055, 1056, 1106, 1107, 1116, 1117, 1097, 1098, 1139, 1140],
    establishmentRequestTypes: {
        issueNewTradeLicense: 1,
        renewTradeLicense: 3,
        concession: 7,
        issueNewTradeLicenseFreeZone: 9,
        addCommercialActivity: 5,
        addRelatedPerson: 6,
        CommercialActivity: 8,
        changeTradeName: 10
    },
    goldenModuleId: {
        goldenEidaFiveYear: 741,
        goldenEidaTenYear: 742,
        goldenResiTenYear: 690
    },
    issueRenewResiFamilyMembersOfTheSponsorUaeCitizenOrGccCitizen: [367, 56, 884, 902, 986, 987, 1017, 1018],
    tawzeeDeliveryEmirates: [1, 2, 3, 4, 6, 7], // Abu Dhabi, Dubai, sharjah, Ajman, RAK, Al Fujerah
    shipTransactionTypes: {
        Entry: 1,
        Exit: 2,
        EntryAndExit: 3
    },
    lookupEstbReasonTransTypes: {
        delete: 1,
        edit: 2,
        add: 3
    },
    lookupUserProfileCategories: {
        mainUserProfileCategory: 1,
        preferredLanguageForCommination: 2
    },
    lookupUserProfileSettings: {
        arabic: 7,
        english: 8
    },
    servicesWithOptionalHumanitarianCase: [569, 567, 900, 909],
    residentResidencyServicesHaveHumanitarianCaseForUsedCheck: [421, 120, 121, 122, 429, 611, 556, 503, 612, 614, 615, 616, 640, 642, 644, 646, 656, 680, 678, 662, 755, 756, 758, 759, 771, 772, 773, 774, 775, 776, 777, 778, 768, 866, 869, 894, 867, 1108, 1102, 1095, 1026, 840, 852],
    serviceWithVirtualSponsor: [960, 961, 974],

    // these keys for human case only , don't use it for aother cases
    familyMemberIssueVisa: [642, 757, 678, 420, 38, 37, 36, 1041, 764, 1092],
    familyMemberIssueResidency: [768, 563, 758, 679, 421, 59, 58, 57, 641, 1042, 1093, 1210],
    familyMemberRenewResidency: [759, 680, 429, 122, 120, 121, 916, 1095],
    familyMemberIssueIcaAndResiUnifiedForm: [869, 866, 506, 504, 502, 907, 884, 879, 556, 867, 1043, 1094, 1212], // ma 76et 852, 840 3shan fe fooq ll new born wla a7o6 3el tneen ??? !!
    familyMemberRenewIcaAndResiUnifiedForm: [894, 507, 505, 503, 906, 902, 889, 915, 1096],

    familyMemberGoldenIssueVisa: [755, 646, 644, 976, 973, 666, 664, 648, 647, 645, 1118, 1099],
    familyMemberGoldenIssueResidency: [667, 665, 662, 659, 658, 657, 616, 615, 614, 612, 982, 981, 656, 756, 611, 1110, 1100],
    familyMemberGoldenRenewResidency: [773, 772, 771, 775, 776, 774, 777, 778, 1025, 1026, 1108, 1102, 1026],
    familyMemberGoldenIssueIcaAndResiUnifiedForm: [876, 875, 865, 864, 858, 856, 851, 847, 846, 843, 842, 841, 878, 975, 970, 1111, 1101],
    familyMemberGoldenRenewIcaAndResiUnifiedForm: [888, 893, 890, 892, 887, 898, 896, 891, 1024, 1027, 1109, 1103, 1027],

    familyMemberGreenIssueVisa: [965, 964, 963],
    familyMemberGreenIssueResidency: [943, 938, 935],
    familyMemberGreenIssueIcaAndResiUnifiedForm: [940, 937, 934],
    familyMemberGreenRenewResidency: [1031, 1033, 1035],
    familyMemberGreenRenewIcaAndResiUnifiedForm: [1032, 1034, 1036],

    familyMemberBlueIssueVisa: [1134],
    familyMemberBlueIssueResidency: [1137],
    familyMemberBlueIssueIcaAndResiUnifiedForm: [1138],
    familyMemberBlueRenewResidency: [1171],
    familyMemberBlueRenewIcaAndResiUnifiedForm: [1172],

    // End human case keys

    checkIfVisitVisaForRelativeOrFriend: [926, 950, 928, 951, 933, 952],
    checkIfExtendVisitVisaForRelativeOrFriend: [1005, 1006, 1007, 1008, 1009, 1010],

    transactionReasonsRequirdSalaryCertificate: [937, 936, 958, 934, 957, 935, 938, 952, 921, 951, 920, 956, 960, 949, 918, 955, 959, 950, 919, 922, 953],

    ////// Task: 400725 - Allow users to add and attach the salary certificate in the nomination request for specific categories
    salaryCertificateTransactionReason: [949, 950, 951, 952, 953, 959, 960],

    // Skip Lookups List of Service
    skipTransactionReasonLookupServiceList: [1012],
    skipTransactionReasonsByModuleParentReasonIdLookupServiceList: [1012],

    // End Skip Lookups List of Service

    professionSkillLevelType: {
        noLevelDefined: 0,
        firstLevel: 1,
        secondLevel: 2,
        thirdLevel: 3
    },
    calenderSyncType: {
        outlook: 1,
        google: 2,
    },
    eventType: {
        Passport: 1,
        Residency: 2,
        Visa: 3,
        EID: 4,
        VisasForVisitingRelativesAndFriends: 5
    },
    mainDepartment: {
        dubaiDepartment: 27
    },

    countriesISOCode: { AFG: 209, ALB: 473, AND: 445, ARE: 101, ARG: 605, ARM: 263, ATG: 251, AUS: 701, AUT: 417, AZE: 265, BEL: 411, BEN: 369, BFA: 351, BGD: 207, BGR: 465, BHR: 107, BHS: 619, BIH: 463, BLR: 483, BLZ: 651, BMU: 634, BOL: 609, BRA: 603, BRB: 657, BRN: 253, BTN: 211, CAF: 363, CAN: 501, CHE: 415, CHL: 607, CHN: 219, CIV: 323, CMR: 309, COD: 313, COL: 611, COM: 301, CPV: 365, CRI: 623, CUB: 621, CYM: 503, CYP: 431, CZE: 452, DEU: 407, DJI: 141, DMA: 642, DNK: 423, DOM: 625, DZA: 131, ECU: 613, EGY: 125, ERI: 303, ESP: 437, EST: 459, ETH: 317, FIN: 433, FJI: 705, FRA: 403, FRO: 276, GBR: 401, GEO: 273, GHA: 319, GIN: 321, GMB: 381, GNB: 385, GNQ: 750, GRC: 431, GRD: 649, GUF: 659, GTM: 627, GUY: 653, HKG: 223, HND: 647, HRV: 453, HTI: 639, HUN: 467, IDN: 243, IND: 205, IRL: 427, IRN: 201, IRQ: 113, ISL: 443, ITA: 405, JAM: 629, JOR: 121, JPN: 231, KAZ: 261, KEN: 325, KGZ: 268, KHM: 215, KIR: 391, KNA: 487, KOR: 227, KWT: 105, LAO: 245, LBN: 117, LBR: 327, LBY: 127, LCA: 663, LIE: 449, LKA: 217, LSO: 377, LTU: 457, LUX: 413, LVA: 461, MAC: 259, MAR: 133, MCO: 439, MDA: 482, MDG: 329, MDV: 257, MEX: 601, MHL: 727, MKD: 430, MLI: 335, MLT: 435, MMR: 213, MNE: 488, MNG: 249, MNP: 721, MOZ: 337, MRT: 135, MTQ: 661, MUS: 367, MWI: 333, MYS: 241, NAM: 373, NCL: 715, NER: 339, NGA: 341, NIC: 631, NLD: 409, NOR: 421, NPL: 235, NRU: 737, NZL: 703, OMN: 111, PAK: 203, PAN: 633, PER: 615, PHL: 237, PLW: 669, PNG: 731, POL: 471, PRI: 641, PRK: 229, PRT: 425, PRY: 645, PSE: 123, QAT: 109, REU: 469, ROU: 469, RUS: 477, RWA: 343, SAU: 103, SDN: 137, SEN: 345, SGP: 225, SLE: 347, SLV: 635, SMR: 447, SOM: 139, SRB: 466, SSD: 138, STP: 395, SUR: 655, SVK: 462, SVN: 455, SWE: 419, SWZ: 379, SYC: 383, SYR: 119, TCD: 311, TGO: 355, THA: 239, TJK: 267, TKM: 269, TLS: 709, TON: 255, TTO: 637, TUN: 129, TUR: 475, TUV: 735, TWN: 221, TZA: 353, UGA: 357, UKR: 479, URY: 643, USA: 502, UZB: 271, VAT: 441, VCT: 665, VEN: 617, VNM: 233, VUT: 733, WSM: 729, YEM: 115, ZAF: 349, ZMB: 359 },

    externalSystem: {
        visaPlatform: 44,
        mohreWorkPackage: 61,
        WorkbundleExternalEntityMohre: 74,
        domesticWorkBundle: 76,
        shoryResiMedicalInsurance: 79,
        mofaAttestationIntegration: 90

    },
    serviceTransactionIdsForRemoveEscapeReportBySponsored: [905, 1028, 1029, 1030],
    transactionReasonsWithProfessionSkillLevelOneOrTwo: [959, 960, 953, 952, 951, 950, 552, 949],
    attachmentInfoSource: {
        departmentOfHealthAbuDhabiHealthFitnessCertificate: 1,
        abuDhabiMunicipalityTawtheeqContract: 2,
        departmentOfEconomicDevelopmentAbuDhabiCommercialLicense: 3,
        AbuDhabiPoliceOwnershipOfTheVehicle: 4,
        AbuDhabiWaterAndElectricityAuthorityElectricitybill: 5,
        EmiratesIDAuthorityApplicationForID: 6,
        MinistryOfHealthHealthFitnessCertificate: 7,
        IntegrationWithMOFA: 19,
        MinistryOfInteriorUAE: 23
    },
    lookupInfoSourceIdsForApplicant: [10, 11, 15, 18],
    lookupInfoSourceIdsForBenficiary: [16, 17],
    lookupInfoSourceIdsForMother: [20, 22],
    lookupInfoSourceIdsForVisa: [21],
    depositFeesTypes: {
        securSecurityDepositFee: 8,
        humantarianSecurityDepositFee: 19
    },
    myDocumentWalletType: {
        tawtheeq: 1,//contract
        eID: 2,
        residency: 3,
        medicalInformation: 4,//haad
        familyBook: 5,
        healthInsurance: 6,
        passport: 7,
        additionalDocumentsType: 8,
        additionalDocuments: {
            passport: 1,
            personalPhoto: 2,
            healthInsurance: 3,
        }
    },
    refundTransactionReasonIds: {
        refundAccordingToTheSponsoredAgeLimitDifference: 983,
        cancelSystemSubscriptionForEstablishments: 634,
        theBeneficiaryIsFromThaExemptedCategories: 992,
        despositForFinesReason: 1005
    },
    relatedPersonType: { itself: 1, sponsored: 2, familyMember: 3 }, // type of tabs in documents page
    onArrivalVisaMode: {
        extendVisa: 2,
        modificationVisa: 3,
        cancellationVisa: 4,
        preEntryExtensionVisa: 5
    },
    outsidePermitExemptionCategories: {
        citizenWifes: 1, // زوجات المواطنين الاجنبيات
        auxiliaryWorkersWithOutsideStudents: 2, // عمالة الخدمة المساعدة المرافقة للمبتعثين للدراسة خارج الدولة.
        auxiliaryWorkersWithOutsideTravelingPatients: 3, // عمالة الخدمة المساعدة و مرافقو المرضى المواطنين المسافرين للعلاج في الخارج.
        foreignPatientsAndTheirCompanions: 4, // المرضى من الأجانب و مرافقيهم المسافرين او المبتعثين للعلاج.
        auxiliaryWorkersMembersOfDiplomaticAndConsularMissions: 5, // عمالة الخدمة المساعدة لأعضاء البعثات الدبلوماسية و القنصلية.
        foreignersOnScholarship: 6, // الأجانب المبتعثين للخارج في قطاعات تعليمية.
        auxiliaryEmployeeInRulingFamily: 7, // عمالة الخدمة المساعدة لإفراد الاسرة الحاكمة.
        studentsEnrolledWithOutsideEducationalFacilities: 8, // الطلبة الملتحقين بالمنشآت التعليمية خارج الدولة.
        investors: 9, // المستثمرون
        stateRepresentativesSponsored: 10, // مكفولو ممثلي الدولة.
        diplomatesAndConsulates: 11, // الدبلوماسيين و القنصليين.
        goldenResidenceHoldersAndFamilyMembers: 12, // حملة الاقامة الذهبية وافراد اسرهم.
        greenResidenceHolderAndFamilyMembers: 13 // حملة الاقامة الخضراء وافراد اسرهم.
    },

    attachmentsTypesIdsForSponsorFileForEstateOrFarm: [586, 587, 588, 589, 590],
    visaTransactionReason: {
        currentNationalityError: 989,
        professionChange: 990,
        passportInfoError: 988,
        personalInfError: 986,
        addressInfoError: 987,
    },
    replacementTypesEidaForResi: {
        dataUpdate: 3,
        changePassportForResidency: 4
    },
    visaModificationNewTransactionReason: [989, 990, 988, 986, 987],


    resiAndIdentityServicesRequiresProofOfKinship: [940, 937, 934, 867, 975, 970, 856, 847, 846, 843, 842, 841, 1043, 990, 986, 907, 879, 869, 866, 506, 504, 502, 1047, 1111, 1101, 1094, 1212],
    visaServicesRequiresProofOfKinship: [995, 994, 965, 964, 963, 976, 973, 755, 648, 647, 646, 645, 644, 1041, 764, 757, 642, 38, 37, 36, 1118, 1092, 1099],
    resiServicesRequiresProofOfKinship: [943, 938, 935, 982, 981, 756, 662, 659, 658, 657, 656, 991, 987, 768, 758, 679, 641, 563, 421, 59, 58, 57, 1110, 1100, 1093, 1210],
    resiServicesRequiresGetFitnessResultFromCanceldFile: [515, 516, 853, 883],

    reasonsRequiresThreeSectionEstabNumber: [960, 959, 953, 951, 952, 949, 950, 943, 777, 941, 942, 782, 780, 779, 783],

    emiratesIDServicesCitizens: [559, 561, 584],

    emiratesIDServicesCitizensFamily: [570, 571, 572, 986, 1017],

    newResiType: {
        propertyOwner: 763,
        foreignerRetired: 693,
        virtualWork: 718,
        divorcedAndWidowed: 670,
        countriesOfDisastersAndWars: 669,
        greenResidncy: 754,
        goldenResidence: 690,
        blueResidence: 787
    },

    attachmentsForCancelResidencyWithoutSponsored: {
        proofOfResidence: 4,
        proofOfIncomeForTheOwnerOfThePropertyIsNotLessThan10000Dirhams: 60,
        aCopyOfThePassportOfTheBeneficiaryOfTheService: 94,
        propertyOwnershipCertificateFromTheCompetentAuthorityForLandRegistration: 130,
        coloredPhoto: 141,
        virtualWorkProofOutsideUAE: 714,
        salaryCertificate3500DollarsOrEquivalentInForeignCurrency: 715,
        bankAccountStatementOfLastSixMonthsTheAnnualIncomeAtLeast180000AEDOrAnyForeignCurrency: 730,
        proofOfFinancialDepositOneMillionAEDAtLeastOrTheEquivalentFromTheForeignCurrencies: 731
    },

    modifyPassportInformationTransactionSubReasons: {

        changePassport: 1000,
        gettingNewNationality: 999,
        errorInCurrentPassportInformation: 998

    },
    updateBasicInformationTransactionSubReasons: {

        updateAddressInformation: 997,
        professionChange: 996,
        updatePersonalInformation: 995
    },
    freeZoneReportsTypes: {
        statisticalRequestsForCompanies: 1001,
        usersKpis: 1002,
        essentialSummaryCharts: 1003
    },
    workSectors: {
        federalGovernment: 1,
        localDepartment: 2,
        governmentEstablishment: 3,
        semiGovernmentEstablishment: 4,
        deplomaticBodies: 7,
        foreignAndContributionCompanies: 11,
        investors: 6,
        personalGuaranty: 8,
        private: 5,
        privateSector: 10
    },
    userAuditResults: {
        profileNeedVerifyNoFreeze: 1,
        profileNeedVerifyFreeze: 2,
        verified: 3,
        rejected: 4,
        verificationRequestSubmittedNoFreeze: 5,
        verificationRequestSubmittedFreeze: 6,
        verificationRequestReturnedFormodification: 7
    },
    contractTypes: {
        limited: 1,
        UnLimited: 2
    },
    legalConditions: {

    },
    wageTypes: {
        commissionBasedWage: 3
    },
    mohreWorkPackageServiceTransactionIds: [1066, 1067, 1068, 1069, 1070, 1071, 400, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1073, 1074, 1076, 1077, 1075, 1129],
    mohreWorkPackageNawakasServiceTransactionIds: [1066, 1073, 1069, 1078, 1081, 1084, 1087],
    mohreWorkPackagePrentServiceIds: [1066, 1078, 1081, 1084, 1087, 1073],
    cancelRenewMohreWorkPackageParentServiceIds: [1078, 1081, 1084, 1087, 1073],
    mohreWorkPackageServiceIds: [1066, 1069, 1078, 1081, 1084, 1087, 1073, 1075],

    mohreUnifiedFormDictionary: {
        1066: 1071,
        1073: 1077
    },
    mohreSecondVisitBasedOnParentServiceId: {
        1066: 1069,
        1073: 1075
    },
    userAwardsTypes: {
        firstDailyCompletion: 1,
        secondDailyCompletion: 2,
        thirdDailyCompletion: 3,
        firstHighestScore: 4,
        secondHighestScore: 5
    },

    removeBanTransactionReasons: { samePerson: 1063, currentSponsored: 1065, previousSponsored: 1066, relative: 1067, investorOrPartner: 1068 },

    visaStatus: {
        valid: 'valid',
        used: 'used'
    },
    servicesRequiresPassportValidityFor30DaysOrMore: [43, 46, 47, 48, 49, 453, 482, 483, 518],

    addressSourceEnum: {
        uDBAddresses: 1,
        userAddresses: 2,
        lastRequestAddresses: 3,
        allNewAddressNoSource: 3,
    },
    addressUserActionEnum: {
        Add: 1,
        Update: 2,
        TemporaryUse: 3
    },
    uaePassAPIHandlerMode: {
        individualLogin: 1,
        establishmentLogin: 2,
        registerEstablishment: 3,
        typingCenterLogin: 4,
        registerTypingCenter: 5,
        registerVisaHolder: 6,
        registerGccResiOrCitizen: 7,
        linkAccount: 8,
        registerEstablishmentSubUser: 9,
        registerTypingCenterSubUser: 10,
        linkEstablishment: 11,
        linkTypingCenter: 12,
        linkEstabSendOtp: 13,
        linkTypingCentrSendOtp: 14
    },
    activateDeactivate: {
        activate: 1,
        deactivate: 4
    },
    codeVisaStatus: {
        active: 2, //code 1
        valid: 9, //code 1
        canceled: 3,//code 2
        used: 8, //code 2
        expired: 4, //code 3
        closed: 10, //code 3
        nearlyExpired: 21, //code 
    },
    renewResidAndEIDAServicesId: [120, 121, 122, 123, 124, 126, 127, 129, 130, 367, 368, 403, 404, 429, 499, 501,
        503, 505, 507, 509, 567, 569, 668, 680, 771, 772, 773, 774, 775, 776,
        777, 778, 887, 888, 890, 891, 892, 893, 894, 895, 896, 897, 898, 900, 901,
        902, 906, 909, 1017, 1018, 1022, 1024, 1027, 1026, 1027, 1032, 1034, 1036, 1048, 1063, 1076, 1077, 1095, 1096, 1102, 1103, 1108, 1109, 1110, 1124, 1123, 640, 1125, 1126, 613, 1127, 1128, 601],

    healthInsuranceAttachmentIds: [55, 73, 245, 790],
    mohreWorkPackageCompletedStatus: [6, 5, 7, 93, 94, 95],
    mohreWorkPackageInprogressStatus: [1, 4, 11, 24, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 87, 88, 96, 102, 103, 110, 111, 112],
    walletTypesEnum: {
        tourismEstablishmentsDepositWallet: 1,
        mohreWallet: 2,
        medicalEstablishmentsDepositWallet: 3,
        studyEstablishmentsDepositWallet: 4
    },
    childProfessions: {
        STUDENT: 8335,
        FSTUDENT: 6951,
        CHILD: 7902,
        FCHILD: 8649
    },
    accompanyPatientTreatmentRequests: [26, 28, 52, 930, 932],
    estabDepositTypes: [1, 2, 3, 7, 8, 10, 11, 12],
    individualsDepositTypes: [4, 5, 6, 7, 8, 9, 10],

    medicalCompanies: {
        EHS: 1,
        DOH: 2
    },
    allFamilyMembersVisaServices: [420, 39, 38, 37, 36, 995, 644, 645, 646, 642, 757, 994, 1041, 647, 648, 664, 666, 755, 678, 963, 964, 965, 764, 973, 976, 1092, 1118, 1099],
    allowedLookupModuleServiceIds: [418, 425, 409, 413, 410, 414, 411, 415, 412, 416, 1052, 1074, 1054, 1075, 1057, 1076, 417, 424, 419, 70, 422, 428, 423, 420, 426, 421, 427, 429, 953],
    allowedLookupModuleTransactionIds: [9, 11],
    gpaScales: {
        outOf4From4: 1,
        outOf5From5: 2,
    },
    publicGategory: {
        goldenServices: 1
    },
    individualSponsoredCategoryType: {
        family: 8,
        work: 9,
        domestic: 10,
        visits: 11,
        canceled: 1
    },
    dwBundleServices: {
        parentPackageServices: [1166, 1146, 1151, 1156, 1157],
        issuanceServices: [1166, 1146, 1151, 1156, 1157],
        renewalServices: [1202, 1199, 1196, 1193, 1189],
        cancelVisaServices: [1179, 1180],
        cancelResiServices: [1177, 1178],
        icp: {
            changeStatusIssuance: 400,
            visa: {
                diplomaticVisaIssuance: 1147,
                investorVisaIssuance: 1152,
                citizenVisaIssuance: 1158,
                gccCitizenVisaIssuance: 1159,
                govermentSectorResisdentVisaIssuance: 1144,
                privateSectorResisdentVisaIssuance: 1167,
                all: [1147, 1152, 1158, 1159, 1144, 1167],
            },
            residency: {
                diplomaticResidencyIssuance: 1149,
                investorResidencyIssuance: 1153,
                citizenResidencyIssuance: 1160,
                gccCitizenResidencyIssuance: 1162,
                govermentSectorResisdentResidencyIssuance: 1161,
                privateSectorResisdentResidencyIssuance: 1168,
                all: [1149, 1153, 1160, 1162, 1161, 1168]
            },

            unifiedForm: {
                diplomaticUnifiedFormIssuance: 1150,
                investorUnifiedFormIssuance: 1154,
                citizenUnifiedFormIssuance: 1163,
                gccCitizenUnifiedFormIssuance: 1164,
                govermentSectorResisdentUnifiedFormIssuance: 1165,
                privateSectorResisdentUnifiedFormIssuance: 1169,
                all: [1150, 1154, 1163, 1164, 1165, 1169]
            }
        },
        dw: {
            sponsorFileIssuance: 1143,
            entryPermitIssuance: 1145,
            changeStatusIssuance: 1148,
            residencyIssuance: 1155
        }
    },
    medicalInsuranceRelations: [2, 3, 4, 5, 8, 19],
    medicalInsuranceRelationsForNewborn: [3, 4],
    navigationToMohreWorkServiceTransactionIdsForMedicalInsurance: [1070, 1071, 1076, 1077],
    mohreDwExternalSystemId: 76,
    bundleReasonMapIcpDictionary: {
        1248: 273,
        1247: 363,
        1246: 364,
        1266: 23,
        1265: 421,
        1264: 420
    },
    establishmentRoles: {
        owner: 1,
        authorized: 8,
        partner: 5,
        Investor: 11
    },
    documentAttestationTypes: {
        emirateId: 1,
        passport: 2,
        entryExitReport: 3
    },
    documentAttestationforServices: [369, 559, 561, 585, 584, 473, 692, 693, 1247],
    paymentTransactionType: { pay: 1, refundTouristEstablishment: 11, depositTouristEstablishment: 12 },
    depositTourismServiceTransIds: { tourism: 1072, medical: 1121, study: 1122 },
    fatherIdentifierTypes: {
        unifiedNumber: 1,
        emiratesID: 2,
        hasNotPreviouslyEnteredUAE: 3
    },
    femalCitizenServicesThatNeedFatherSection : [986, 987, 988, 989, 1017, 1018],
}