import { ArticleGuide } from "../../types";

export const capcutKeyframeAnimationGuide: ArticleGuide = {
  title: "Mastering Keyframe Animation in CapCut: Smooth Motion & Text Effects (2026)",
  slug: "capcut-keyframe-animation-guide",
  description: "Learn how to use keyframe animation in CapCut mobile and PC. Animate text, zoom effects, object movement, opacity fades, and fix shaky keyframe motion.",
  category: "how-to",
  tags: ["capcut", "keyframe-animation", "motion-graphics", "text-effects", "video-editing"],
  publishedAt: "2026-08-01",
  updatedAt: "2026-08-03",
  readingTime: "5 min",
  heroImage: "/images/guides/capcut-keyframe-animation-guide.png",
  author: "DSWReturnRefund Editorial Team",
  relatedStores: ["capcut-pro"],
  relatedArticles: [
    "capcut-beginners-guide-free-vs-pro",
    "capcut-auto-captions-guide-and-faq",
    "capcut-troubleshooting-and-crash-fixes"
  ],
  summary: "Keyframes allow editors to create customized motion paths, zoom ins, rotations, and opacity changes over time. CapCut supports keyframe controls on video clips, overlay images, text, and masks for free.",
  quickAnswer: "Keyframe Animation in CapCut allows you to set timeline anchor points to change scale, position, rotation, or transparency over time. Tap the diamond Keyframe icon at your start point, adjust your clip at the end point, and CapCut will interpolate smooth motion between the keyframes automatically.",
  verifiedSourceUrl: "https://www.capcut.com/help",
  verifiedSourceDate: "2026-08-03",
  factRows: [
    {
      label: "Free Version Availability",
      value: "Fully supported on mobile & PC",
      status: "yes"
    },
    {
      label: "Animatable Attributes",
      value: "Position, Scale, Rotation, Opacity, Mask",
      status: "yes"
    },
    {
      label: "Optimal Keyframe Density",
      value: "2 to 3 points per motion segment",
      status: "yes"
    },
    {
      label: "Ease Curves Support",
      value: "Custom velocity curves available",
      status: "yes"
    },
    {
      label: "Text Keyframing",
      value: "Supported for kinetic title reveals",
      status: "yes"
    }
  ],
  sources: [
    {
      title: "CapCut Official Keyframe Animation & Velocity Curve Documentation",
      url: "https://www.capcut.com/help",
      publisher: "CapCut Desktop & Mobile Support",
      dateAccessed: "2026-08-03"
    }
  ],
  faqs: [
    {
      question: "What is Keyframe Animation in CapCut?",
      answer: "Keyframe Animation in CapCut lets you create smooth motion by setting specific points on the timeline. You can control an object's position, size, rotation, or opacity between keyframes, making it easy to create professional-looking animations for videos, images, stickers, and text."
    },
    {
      question: "Is keyframe available in the free version of CapCut?",
      answer: "Yes, CapCut includes the basic Keyframe Animation feature in its free version for both mobile and desktop users. You can animate clips, images, and text without a subscription, while some advanced effects and AI features are available only in CapCut Pro."
    },
    {
      question: "How many keyframes should I use?",
      answer: "For simple and smooth animations, two or three keyframes are usually enough. Adding too many keyframes can make movement appear unnatural or difficult to control. Start with a few keyframes, then add more only when your animation needs extra detail."
    },
    {
      question: "Can I use keyframe animation for text?",
      answer: "Yes, CapCut allows you to animate text using keyframes. You can move text across the screen, change its size, rotate it, or adjust its opacity to create eye-catching titles, captions, intros, and other creative text effects."
    },
    {
      question: "Does CapCut for PC support keyframe animation?",
      answer: "Yes, the CapCut desktop version fully supports Keyframe Animation and provides the same core functionality as the mobile app. The larger screen and precise mouse controls make it easier to create detailed animations and fine-tune movement accurately."
    },
    {
      question: "Why does my keyframe animation look shaky?",
      answer: "Shaky animations usually happen when keyframes are placed too close together or when the movement between them is too large. Try spacing the keyframes farther apart and using smaller, smoother transitions to create more natural and professional-looking motion."
    }
  ],
  steps: [
    {
      title: "Set Initial Keyframe",
      text: "Position playhead at the start of your animation move and tap the diamond Keyframe icon (+) below the preview player."
    },
    {
      title: "Move Playhead & Transform Clip",
      text: "Scrub the playhead forward in time, then pinch to zoom, drag to reposition, or rotate the video clip."
    },
    {
      title: "Apply Velocity Curve",
      text: "Tap Graphs on the bottom toolbar to choose Ease In, Ease Out, or Curve presets for natural acceleration."
    }
  ],
  proseContent: `
## How Do Keyframes and Motion Animations Work in CapCut?

Keyframing is the foundation of computer animation. By marking specific keyframes at different points along a timeline, software automatically calculates linear or curved interpolation between those points.

In CapCut, keyframes can manipulate spatial properties (X/Y position, scale percentage, rotation angle) alongside visual properties (layer opacity, blur intensity, mask boundaries).

## How to Fix Shaky Keyframe Motion Using Velocity Graphs

A common beginner mistake is placing too many keyframe markers too close together, resulting in jittery or robotic motion paths. 

To achieve smooth cinematic movement, place keyframe markers only at motion start and endpoints. Then open CapCut's **Graphs / Velocity Curve** menu and apply an **Ease In / Ease Out** curve, which applies realistic physical acceleration and deceleration.
`
};
