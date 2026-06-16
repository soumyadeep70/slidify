import { SlideAudience, SlideLayout, SlideTone } from './presentation-options'

export const enum SlideTemplate {
  PRODUCT_TOUR = 'product-tour',
  MEETING_SUMMARY = 'meeting-summary',
  SALES_PITCH = 'sales-pitch',
  PROJECT_UPDATE = 'project-update',
  STARTUP_PITCH = 'startup-pitch',
  TRAINING_UPDATE = 'training-update',
}

export const templateOptions = [
  {
    value: SlideTemplate.PRODUCT_TOUR,
    label: 'Product Tour',
    tone: SlideTone.PROFESSIONAL,
    layout: SlideLayout.VISUAL,
    audience: SlideAudience.INVESTORS,
    prompt: `
      Introducing our new product: Aurora Notes
      
      Key Features:
      - Lightning-fast note capture with AI-powered suggestions
      - Smart organization that automatically categorizes your notes
      - Real-time sync across all your devices
      - Beautiful dark mode and customizable themes
      - Collaboration tools for team workspaces

      Target Audience:
      - Professionals who need quick note-taking
      - Students organizing research and lectures
      - Teams collaborating on projects
    `,
  },
  {
    value: SlideTemplate.MEETING_SUMMARY,
    label: 'Meeting Summary',
    tone: SlideTone.PROFESSIONAL,
    layout: SlideLayout.MINIMAL,
    audience: SlideAudience.TEAM,
    prompt: `
      Q3 Planning Meeting - April 2024

      Attendees: Product, Engineering, Design, Marketing

      Key Decisions:
      - Launch new onboarding flow by end of May
      - Reduce customer churn by 15% through improved support
      - Redesign pricing page with clearer tier comparison

      Action Items:
      - Sarah: Finalize onboarding wireframes (Due: April 20)
      - Mike: Set up churn analysis dashboard (Due: April 25)
      - Lisa: Draft new pricing copy (Due: April 22)

      Next Steps:
      - Weekly sync every Tuesday at 10am
      - Review progress in 2 weeks
    `,
  },
  {
    value: SlideTemplate.SALES_PITCH,
    label: 'Sales Pitch',
    tone: SlideTone.BOLD,
    layout: SlideLayout.VISUAL,
    audience: SlideAudience.CLIENTS,
    prompt: `
      Why Choose Our Platform?

      The Problem:
      - Teams waste 5+ hours weekly on manual reporting
      - Data lives in silos across different tools
      - Decision-making is slow without real-time insights

      Our Solution:
      - Automated dashboards that update in real-time
      - One-click integrations with 50+ tools
      - AI-powered insights and recommendations

      Results Our Clients See:
      - 60% reduction in reporting time
      - 3x faster decision-making
      - 40% increase in team productivity

      Pricing: Starting at $29/user/month
      Free 14-day trial, no credit card required
    `,
  },
  {
    value: SlideTemplate.PROJECT_UPDATE,
    label: 'Project Update',
    tone: SlideTone.CASUAL,
    layout: SlideLayout.DENSE,
    audience: SlideAudience.TEAM,
    prompt: `
      Project Phoenix - Status Update

      Timeline: On track for June 15 launch

      Completed This Sprint:
      - User authentication system fully implemented
      - Database migration completed successfully
      - Core API endpoints tested and deployed

      In Progress:
      - Frontend dashboard (75% complete)
      - Mobile responsive design (60% complete)
      - Integration testing phase

      Blockers:
      - Waiting on final brand assets from design team
      - Need additional QA resources for testing

      Budget Status: $45,000 of $50,000 allocated (90%)
    `,
  },
  {
    value: SlideTemplate.STARTUP_PITCH,
    label: 'Startup Pitch',
    tone: SlideTone.CREATIVE,
    layout: SlideLayout.VISUAL,
    audience: SlideAudience.INVESTORS,
    prompt: `
      EcoTrack - Making Sustainability Simple

      Problem:
      - 73% of consumers want to reduce their carbon footprint
      - But tracking personal environmental impact is complex
      - Existing solutions are either too technical or inaccurate

      Solution:
      - AI-powered app that automatically tracks your carbon footprint
      - Connects to banking, travel, and shopping data
      - Provides personalized tips to reduce impact

      Traction:
      - 50,000 active users in 6 months
      - 4.8 star rating on App Store
      - Featured in TechCrunch and Forbes

      Ask: $2M seed round for team expansion and marketing
    `,
  },
  {
    value: SlideTemplate.TRAINING_UPDATE,
    label: 'Training Update',
    tone: SlideTone.ACADEMIC,
    layout: SlideLayout.MINIMAL,
    audience: SlideAudience.STUDENTS,
    prompt: `
      New Employee Onboarding Guide

      Welcome to the Team!

      Week 1 - Getting Started:
      - Set up your accounts and tools
      - Meet your team members
      - Review company handbook and policies

      Week 2 - Learning the Ropes:
      - Shadow experienced team members
      - Complete required training modules
      - Attend product overview sessions

      Week 3-4 - Hands-On Practice:
      - Start with supervised tasks
      - Regular check-ins with your mentor
      - Begin contributing to team projects

      Resources:
      - Internal wiki: wiki.company.com
      - IT Support: support@company.com
      - HR Questions: hr@company.com
    `,
  },
]
