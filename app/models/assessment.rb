# frozen_string_literal: true

class Assessment
  include Mongoid::Document

  embedded_in :arm

  # key can be primary or secondary
  field :key, default: "primary"
  # Title is "Total Patient Population" by default or the disease name
  field :title, type: String, default: "Total Patient Population"
  field :number_of_patients, type: Hash, default: {
    screened: "",
    enrolled: "",
    evaluable: "",
    evaluated: ""
  }
  field :evaluation_method, default: ""
  field :response_assessment, type: Hash, default: {
    cr_n: "",
    pr_n: "",
    sd_n: "",
    pd_n: "",
    other_n: "",
    cr: "",
    pr: "",
    sd: "",
    pd: "",
    other: ""
  }
  field :duration_assessments, type: Hash, default: {
    pfs: "",
    ttp: "",
    os: "",
    response_duration: "",
    treatment_duration: "",
    pfs_time: "",
    ttp_time: "",
    os_time: "",
    response_duration_time: "",
    treatment_duration_time: "",
    pfs_ci: "",
    ttp_ci: "",
    os_ci: ""
  }
  field :secondary_needed, type: Boolean, default: false
  field :waterfall_plot, type: Boolean, default: false
  field :kaplan_meier_plot, type: Boolean, default: false
  field :shrinkage, type: Hash, default: {}
  field :km_data, type: Hash, default: {}
  field :km_units, default: ""
  field :km_pfs_os, default: ""
  field :km_xml, default: ""
  field :wfp_legend, default: "" # Waterfall plot legend
  field :km_legend, default: "" # Kaplan-Meier plot legend
  field :outcome_notes, default: ""

  scope :primary, -> { where(key: /^primary/i) }
  scope :primary_only, -> { where(key: "primary") }
  scope :primary_control, -> { where(key: "primary_control") }
  scope :secondary, -> { where(key: /^secondary/i) }
  scope :secondary_only, -> { where(key: "secondary") }
  scope :secondary_control, -> { where(key: "secondary_control") }
  scope :control, -> { where(key: /control$/i) }

  EVALUATION_METHOD_LIST = ['RECIST 1.0', 'RECIST 1.1', 'WHO', 'Tumor marker', '']

  def primary_assessment_method_json
    {
      id:self.id.to_s,
      key:self.key,
      title:self.title,
      evaluation_method:self.evaluation_method,
      number_of_patients:self.number_of_patients,
      response_assessment:self.response_assessment,
      duration_assessments:self.duration_assessments,
      waterfall_plot:self.waterfall_plot,
      shrinkage:self.shrinkage,
      wfp_legend:self.wfp_legend,
      km_legend:self.km_legend,
      kaplan_meier_plot:self.kaplan_meier_plot,
      km_units:self.km_units,
      km_pfs_os:self.km_pfs_os,
      km_data:self.km_data,
      km_legend:self.km_legend,
      outcome_notes:self.outcome_notes
    }
  end

  def set_primary_assessment_method assessment
    self.key=assessment[:key]
    self.title=assessment[:title]
    self.evaluation_method=assessment[:evaluation_method]
    self.waterfall_plot=assessment[:waterfall_plot]
    self.wfp_legend=assessment[:wfp_legend]
    self.kaplan_meier_plot=assessment[:kaplan_meier_plot]
    self.outcome_notes=assessment[:outcome_notes]

    if assessment[:shrinkage]
      assessment[:shrinkage].each_pair { |key, value|
        self.shrinkage[key]=value
      }
    end

    num_patients=assessment[:number_of_patients]
    if num_patients
      self.number_of_patients={
        screened:num_patients["screened"],
        enrolled:num_patients["enrolled"],
        evaluable:num_patients["evaluable"],
        evaluated:num_patients["evaluated"]
      }
    end
    resp_assessment=assessment[:response_assessment]
    if resp_assessment
      self.response_assessment={
        cr_n: resp_assessment["cr_n"],
        pr_n: resp_assessment["pr_n"],
        sd_n: resp_assessment["sd_n"],
        pd_n: resp_assessment["pd_n"],
        other_n: resp_assessment["other_n"],
        cr: resp_assessment["cr"],
        pr: resp_assessment["pr"],
        sd: resp_assessment["sd"],
        pd: resp_assessment["pd"],
        other: resp_assessment["other"]
      }
    end
    dur_assessment=assessment[:duration_assessments]
    if dur_assessment
      self.duration_assessments={
        pfs: dur_assessment["pfs"],
        ttp: dur_assessment["ttp"],
        os: dur_assessment["os"],
        response_duration: dur_assessment["response_duration"],
        treatment_duration: dur_assessment["treatment_duration"],
        pfs_time: dur_assessment["pfs_time"],
        ttp_time: dur_assessment["ttp_time"],
        os_time: dur_assessment["os_time"],
        response_duration_time: dur_assessment["response_duration_time"],
        treatment_duration_time: dur_assessment["treatment_duration_time"],
        pfs_ci: dur_assessment["pfs_ci"],
        ttp_ci: dur_assessment["ttp_ci"],
        os_ci: dur_assessment["os_ci"]
      }
    end
    self.km_units=assessment[:km_units]
    self.km_pfs_os=assessment[:km_pfs_os]
    self.km_legend=assessment[:km_legend]
    if assessment[:km_data]
      ctr=0
      assessment[:km_data].each do |km|
        self.km_data[ctr]={
          event_time:km[:event_time], 
          progressed:km[:progressed], 
          censored:km[:censored], 
          evaluation_percent:km[:evaluation_percent], 
          km_percent:km[:km_percent], 
          next_evaluation:km[:next_evaluation]
        }
        ctr=ctr+1
      end
    end
  end

  def submission_overview_response
    obj=self.response_assessment
    {
      CR: {N:"N =#{obj[:cr_n]}", percent:obj[:cr]},
      PR: {N:"N =#{obj[:pr_n]}", percent:obj[:pr]},
      SD: {N:"N =#{obj[:sd_n]}", percent:obj[:sd]},
      PD: {N:"N =#{obj[:pd_n]}", percent:obj[:pd]},
      other: {N:"N =#{obj[:other_n]}", percent:obj[:other]}
    }
  end

  def submission_overview_duration
    obj=self.duration_assessments
    {
      PFS: "#{obj[:pfs]} #{obj[:pfs_time]}, CI:#{obj[:pfs_ci]}",
      TTP: "#{obj[:ttp]} #{obj[:ttp_time]}, CI:#{obj[:ttp_ci]}",
      OS: "#{obj[:os]} #{obj[:os_time]}, CI:#{obj[:os_ci]}",
      response_duration: "#{obj[:response_duration]} #{obj[:response_duration_time]}",
      treatment_duration: "#{obj[:treatment_duration]} #{obj[:treatment_duration_time]}"
    }
  end
end
