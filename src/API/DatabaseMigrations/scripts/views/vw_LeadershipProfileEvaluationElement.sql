CREATE OR ALTER VIEW edfi.vw_LeadershipProfileEvaluationElement AS
SELECT
    staff.StaffUSI
  , staff.StaffUniqueId
  , eerr.EvaluationObjectiveTitle AS ObjectiveTitle
  , eerr.EvaluationElementTitle AS ElementTitle
  , eerr.Rating AS Rating
  , CAST(eerr.SchoolYear AS INT) AS SchoolYear
  , CAST(Row_number() OVER
    (PARTITION BY eerr.PersonId, eerr.EvaluationObjectiveTitle, eerr.SchoolYear
         ORDER BY eerr.SchoolYear DESC, eerr.EvaluationDate DESC, eerr.CreateDate DESC) AS INT) AS EvalNumber

FROM tpdm.EvaluationElementRatingResult eerr
JOIN edfi.Staff AS staff ON staff.PersonId = eerr.PersonId
;
