export const enum SlideTone {
  PROFESSIONAL = 'professional',
  CREATIVE = 'creative',
  ACADEMIC = 'academic',
  CASUAL = 'casual',
  BOLD = 'bold',
}

export const toneOptions = [
  { value: SlideTone.PROFESSIONAL, label: "Professional" },
  { value: SlideTone.CREATIVE,     label: "Creative" },
  { value: SlideTone.CASUAL,       label: "Casual" },
  { value: SlideTone.ACADEMIC,     label: "Academic" },
  { value: SlideTone.BOLD,         label: "Bold" },
]

export const enum SlideLayout {
  MINIMAL = 'minimal',
  VISUAL = 'visual',
  DENSE = 'dense',
}

export const layoutOptions = [
  { value: SlideLayout.MINIMAL, label: "Minimal", desc: 'Text-forward, whitespace-rich' },
  { value: SlideLayout.VISUAL,  label: "Visual",  desc: 'Images and icons prominent' },
  { value: SlideLayout.DENSE,   label: "Dense",   desc: 'Data-heavy, compact layout' },
]

export const enum SlideAudience {
  GENERAL = 'general',
  INVESTORS = 'investors',
  STUDENTS = 'students',
  CLIENTS = 'clients',
  TEAM = 'team',
}

export const audienceOptions = [
  { value: SlideAudience.GENERAL,   label: "General" },
  { value: SlideAudience.CLIENTS,   label: "Clients" },
  { value: SlideAudience.STUDENTS,  label: "Students" },
  { value: SlideAudience.INVESTORS, label: "Investors" },
  { value: SlideAudience.TEAM,      label: "Team" },
]