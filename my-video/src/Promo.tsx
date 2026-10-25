import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { loadFont } from "@remotion/fonts";

// Manrope (same font as koreadatalim.com), bundled locally in public/fonts
const fontFamily = "Manrope";
for (const weight of ["500", "700", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/manrope-latin-${weight}-normal.woff2`),
    weight,
  });
}

// Brand colors from koreadatalim.com
const C = {
  brand: "#1550D8",
  brandLight: "#5B8CFF",
  brandPale: "#9DB8FF",
  navy: "#070D1A",
  navy2: "#0B1A3A",
  ink: "#0F1B33",
  light: "#F3F6FB",
  red: "#D2394A",
  white: "#FFFFFF",
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const SCENES = [126, 108, 102, 150, 111, 135, 114, 138];
const T = 12;
export const PROMO_DURATION =
  SCENES.reduce((a, b) => a + b, 0) - T * (SCENES.length - 1);

/* ---------- Building blocks ---------- */

const Words: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  accent?: string[];
  accentColor?: string;
}> = ({ text, delay = 0, stagger = 4, style, accent = [], accentColor }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: "0.28em", ...style }}>
      {text.split(" ").map((w, i) => {
        const start = delay + i * stagger;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: accent.includes(w) ? accentColor : undefined,
              opacity: interpolate(frame, [start, start + 12], [0, 1], clamp),
              translate: interpolate(frame, [start, start + 18], ["0px 40px", "0px 0px"], {
                ...clamp,
                easing: ease,
              }),
              filter: `blur(${interpolate(frame, [start, start + 12], [10, 0], clamp)}px)`,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

const PhotoBg: React.FC<{ src: string; overlay: string; zoomFrom?: number; zoomTo?: number }> = ({
  src,
  overlay,
  zoomFrom = 1.06,
  zoomTo = 1.18,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.navy }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], clamp),
        }}
      />
      <AbsoluteFill style={{ background: overlay }} />
    </AbsoluteFill>
  );
};

const Bar: React.FC<{ delay: number; color?: string; width?: number }> = ({
  delay,
  color = C.brandLight,
  width = 260,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        height: 12,
        borderRadius: 6,
        backgroundColor: color,
        width: interpolate(frame, [delay, delay + 20], [0, width], { ...clamp, easing: ease }),
      }}
    />
  );
};

// Taegeuk mark from the Korean flag
const Taegeuk: React.FC<{ size: number; rotate?: number }> = ({ size, rotate = 0 }) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" style={{ rotate: `${rotate}deg` }}>
    <circle r={50} fill="#0047A0" />
    <path d="M -50 0 A 50 50 0 0 1 50 0 A 25 25 0 0 1 0 0 A 25 25 0 0 0 -50 0 Z" fill="#CD2E3A" />
  </svg>
);

const textShadow = "0 6px 30px rgba(0,0,0,0.45)";

/* ---------- Scenes ---------- */

const Hook1: React.FC = () => (
  <AbsoluteFill>
    <PhotoBg
      src="img/g13.jpg"
      overlay="linear-gradient(90deg, rgba(7,13,26,0.92) 0%, rgba(7,13,26,0.6) 55%, rgba(7,13,26,0.15) 100%)"
    />
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 140px", color: C.white, textShadow }}>
      <Words text="CHET ELDA O'QISH UCHUN" delay={6} style={{ fontSize: 60, fontWeight: 700, color: C.brandPale, letterSpacing: 2 }} />
      <div style={{ height: 18 }} />
      <Words text="KOREANI" delay={22} style={{ fontSize: 170, fontWeight: 800, lineHeight: 1 }} />
      <div style={{ margin: "18px 0 22px" }}>
        <Bar delay={34} width={420} />
      </div>
      <Words text="TANLADINGIZMI?" delay={40} style={{ fontSize: 130, fontWeight: 800, lineHeight: 1 }} />
    </AbsoluteFill>
  </AbsoluteFill>
);

const Hook2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <PhotoBg
        src="img/g08.jpg"
        overlay="linear-gradient(90deg, rgba(7,13,26,0.92) 0%, rgba(7,13,26,0.6) 55%, rgba(7,13,26,0.2) 100%)"
        zoomFrom={1.18}
        zoomTo={1.06}
      />
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 140px", color: C.white, textShadow }}>
        <Words text="ISHONCHLI AGENT" delay={4} stagger={6} style={{ fontSize: 150, fontWeight: 800, lineHeight: 1.05 }} accent={["AGENT"]} accentColor={C.brandLight} />
        <div style={{ display: "flex", alignItems: "center", gap: 36, marginTop: 10 }}>
          <Words text="QIDIRYAPSIZMI?" delay={18} style={{ fontSize: 130, fontWeight: 800, lineHeight: 1.05 }} />
          <svg
            width={120}
            height={120}
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.brandLight}
            strokeWidth={2.4}
            strokeLinecap="round"
            style={{
              opacity: interpolate(frame, [30, 42], [0, 1], clamp),
              translate: `${Math.sin(frame / 6) * 10}px ${Math.cos(frame / 6) * 6}px`,
            }}
          >
            <circle cx={10.5} cy={10.5} r={6.5} />
            <path d="M15.5 15.5 L21 21" />
          </svg>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 2, fps, config: { damping: 12 } });
  const name = "KOREADATALIM";
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 45%, ${C.brand} 0%, ${C.navy2} 55%, ${C.navy} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        color: C.white,
      }}
    >
      <div style={{ scale: pop, marginBottom: 30 }}>
        <Taegeuk size={130} rotate={interpolate(frame, [0, 102], [-90, 30])} />
      </div>
      <Words text="UNDA" delay={8} style={{ fontSize: 56, fontWeight: 700, color: C.brandPale, letterSpacing: 8 }} />
      <div style={{ display: "flex", fontSize: 180, fontWeight: 800, letterSpacing: 4, lineHeight: 1.1 }}>
        {name.split("").map((ch, i) => {
          const s = spring({ frame: frame - 14 - i * 2, fps, config: { damping: 14 } });
          return (
            <span key={i} style={{ display: "inline-block", opacity: s, translate: `0px ${(1 - s) * 80}px` }}>
              {ch}
            </span>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 16 }}>
        <div style={{ height: 4, backgroundColor: C.brandLight, width: interpolate(frame, [40, 60], [0, 160], { ...clamp, easing: ease }) }} />
        <Words text="AYNAN SIZ UCHUN" delay={42} style={{ fontSize: 70, fontWeight: 800 }} />
        <div style={{ height: 4, backgroundColor: C.brandLight, width: interpolate(frame, [40, 60], [0, 160], { ...clamp, easing: ease }) }} />
      </div>
    </AbsoluteFill>
  );
};

const Check: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5 L10 17.5 L19 7" />
  </svg>
);

const Journey: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const steps = ["Hujjatlar", "Universitetga qabul", "Visa"];
  const stepStart = 40;
  const stepGap = 22;
  const cards = ["img/visa03.jpg", "img/visa04.jpg", "img/visa05.jpg", "img/visa09.jpg"];
  const stamp = spring({ frame: frame - 100, fps, config: { damping: 10 } });
  return (
    <AbsoluteFill style={{ backgroundColor: C.light, color: C.ink }}>
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 0 0 140px", width: 1020 }}>
        <Words text="UNIVERSITETGA QABUL HUJJATLARIDAN TORTIB" delay={2} stagger={3} style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.15 }} />
        <Words text="VISA OLISHINGIZGACHA" delay={18} style={{ fontSize: 96, fontWeight: 800, color: C.brand, lineHeight: 1.15, marginTop: 8 }} />
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: 70 }}>
          {steps.map((s, i) => {
            const t = stepStart + i * stepGap;
            const on = spring({ frame: frame - t, fps, config: { damping: 13 } });
            return (
              <React.Fragment key={s}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 220 }}>
                  <div
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: 42,
                      backgroundColor: i === 2 ? C.red : C.brand,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      scale: on,
                      boxShadow: "0 10px 30px rgba(21,80,216,0.3)",
                    }}
                  >
                    <Check size={46} />
                  </div>
                  <div style={{ marginTop: 16, fontSize: 30, fontWeight: 700, textAlign: "center", opacity: on }}>{s}</div>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 90, height: 6, marginTop: 39, backgroundColor: "#D5DDEA", borderRadius: 3, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        backgroundColor: C.brand,
                        width: `${interpolate(frame, [t + 6, t + stepGap], [0, 100], clamp)}%`,
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </AbsoluteFill>
      {cards.map((src, i) => {
        const s = spring({ frame: frame - 30 - i * 8, fps, config: { damping: 15 } });
        const rot = [-14, -5, 5, 13][i];
        return (
          <div
            key={src}
            style={{
              position: "absolute",
              left: 1180 + i * 120,
              top: 300 + Math.abs(i - 1.5) * 30,
              width: 330,
              height: 466,
              rotate: `${rot * s}deg`,
              translate: `0px ${(1 - s) * 700}px`,
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(11,26,58,0.28)",
              backgroundColor: C.white,
            }}
          >
            <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(0.6px)" }} />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 1440,
          top: 560,
          width: 250,
          height: 250,
          borderRadius: 125,
          border: `10px solid ${C.red}`,
          color: C.red,
          backgroundColor: "rgba(255,255,255,0.88)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          rotate: "-14deg",
          scale: interpolate(stamp, [0, 1], [2.2, 1]),
          opacity: interpolate(frame, [100, 106], [0, 1], clamp),
        }}
      >
        <div style={{ fontSize: 64, lineHeight: 1 }}>VISA</div>
        <div style={{ fontSize: 30, letterSpacing: 2 }}>TASDIQLANDI</div>
      </div>
    </AbsoluteFill>
  );
};

const Team: React.FC = () => (
  <AbsoluteFill>
    <PhotoBg
      src="img/g10.jpg"
      overlay="linear-gradient(0deg, rgba(7,13,26,0.95) 0%, rgba(7,13,26,0.55) 45%, rgba(7,13,26,0.1) 100%)"
      zoomFrom={1.04}
      zoomTo={1.14}
    />
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 140px 120px", color: C.white, textShadow }}>
      <Words text="BU YO'LDA SIZGA HAMROHLIK QILADIGAN" delay={6} stagger={3} style={{ fontSize: 58, fontWeight: 700, color: C.brandPale }} />
      <Words text="KOREADATALIM JAMOASI" delay={20} stagger={6} style={{ fontSize: 140, fontWeight: 800, lineHeight: 1.05, marginTop: 6 }} accent={["KOREADATALIM"]} accentColor={C.brandLight} />
    </AbsoluteFill>
  </AbsoluteFill>
);

const Future: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const photos = [
    { src: "img/g02.jpg", x: 1020, y: 120, r: -6 },
    { src: "img/g09.jpg", x: 1300, y: 380, r: 5 },
    { src: "img/g03.jpg", x: 1060, y: 620, r: -3 },
  ];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 100%)`, color: C.white }}>
      {photos.map((p, i) => {
        const s = spring({ frame: frame - 6 - i * 10, fps, config: { damping: 16 } });
        return (
          <div
            key={p.src}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: 600,
              height: 380,
              padding: 12,
              backgroundColor: C.white,
              borderRadius: 8,
              boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
              rotate: `${p.r}deg`,
              translate: `${(1 - s) * 900}px 0px`,
              opacity: s,
            }}
          >
            <Img src={staticFile(p.src)} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }} />
          </div>
        );
      })}
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 0 0 140px", width: 960 }}>
        <Words text="KELAJAGINGIZ" delay={4} style={{ fontSize: 120, fontWeight: 800, lineHeight: 1.05 }} />
        <Words text="BIZ UCHUN MUHIM" delay={14} style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.1, color: C.brandLight }} />
        <div style={{ margin: "40px 0 34px" }}>
          <Bar delay={30} width={200} color={C.red} />
        </div>
        <Words
          text="Shunday ekan, uni o'z ishining ustalariga topshiring"
          delay={40}
          stagger={3}
          style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.3, color: "#DCE4F5" }}
          accent={["ustalariga"]}
          accentColor={C.white}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LinkIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round">
    <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2" />
    <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
  </svg>
);

const Consult: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const badge = spring({ frame: frame - 2, fps, config: { damping: 10 } });
  const tap = frame - 62;
  return (
    <AbsoluteFill style={{ backgroundColor: C.light, color: C.ink }}>
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 0 0 140px", width: 1080 }}>
        <div
          style={{
            alignSelf: "flex-start",
            backgroundColor: C.red,
            color: C.white,
            fontSize: 64,
            fontWeight: 800,
            padding: "10px 36px",
            borderRadius: 20,
            letterSpacing: 4,
            scale: badge,
            rotate: "-3deg",
          }}
        >
          BEPUL
        </div>
        <Words text="KONSULTATSIYA" delay={8} style={{ fontSize: 130, fontWeight: 800, lineHeight: 1.1, marginTop: 20 }} />
        <Words
          text="Instagramdagi bio link orqali bemalol qoldiring"
          delay={24}
          stagger={3}
          style={{ fontSize: 52, fontWeight: 700, color: "#3A4A6B", marginTop: 26, lineHeight: 1.3 }}
          accent={["Instagramdagi", "bio", "link"]}
          accentColor={C.brand}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 1250,
          top: 150,
          width: 620,
          padding: 44,
          backgroundColor: C.white,
          borderRadius: 36,
          boxShadow: "0 40px 90px rgba(11,26,58,0.18)",
          translate: `0px ${(1 - card) * 500}px`,
          opacity: card,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: 120,
            padding: 7,
            background: "linear-gradient(45deg, #F9CE34, #EE2A7B, #6228D7)",
          }}
        >
          <Img src={staticFile("img/founder.jpg")} style={{ width: "100%", height: "100%", borderRadius: "50%", border: "6px solid white", objectFit: "cover" }} />
        </div>
        <div style={{ fontSize: 42, fontWeight: 800, marginTop: 24 }}>@ikhlos_khamidov</div>
        <div style={{ fontSize: 30, fontWeight: 500, color: "#5A6680", marginTop: 8, textAlign: "center" }}>
          Koreada o'qish · Qabul · Visa
        </div>
        <div style={{ position: "relative", marginTop: 34 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 30px",
              borderRadius: 18,
              backgroundColor: C.brand,
              color: C.white,
              fontSize: 38,
              fontWeight: 800,
              scale: interpolate(tap, [0, 4, 10], [1, 0.92, 1], clamp),
            }}
          >
            <LinkIcon size={34} color={C.white} />
            Bepul konsultatsiya
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop: -30,
              borderRadius: 30,
              border: `5px solid ${C.brandLight}`,
              scale: interpolate(tap, [0, 24], [0.3, 4], clamp),
              opacity: interpolate(tap, [0, 4, 24], [0, 0.9, 0], clamp),
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pill = spring({ frame: frame - 34, fps, config: { damping: 11 } });
  const unis = ["cbnu", "cpu", "kau", "hanbat", "hoseo", "kyonggi", "yewon", "kongju"];
  return (
    <AbsoluteFill style={{ color: C.white }}>
      <PhotoBg
        src="img/g07.jpg"
        overlay={`radial-gradient(circle at 50% 45%, rgba(21,80,216,0.82) 0%, rgba(11,26,58,0.94) 60%, rgba(7,13,26,0.98) 100%)`}
        zoomFrom={1.15}
        zoomTo={1.05}
      />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 120 }}>
        <Taegeuk size={90} rotate={interpolate(frame, [0, 138], [0, 120])} />
        <Words text="KOREAGA KELISHMI?" delay={4} stagger={6} style={{ fontSize: 110, fontWeight: 800, marginTop: 28, justifyContent: "center" }} />
        <Words text="UNDA" delay={22} style={{ fontSize: 56, fontWeight: 700, color: C.brandPale, letterSpacing: 8, marginTop: 18 }} />
        <div
          style={{
            marginTop: 26,
            padding: "26px 70px",
            borderRadius: 999,
            backgroundColor: C.white,
            color: C.brand,
            fontSize: 112,
            fontWeight: 800,
            letterSpacing: 2,
            scale: pill,
            boxShadow: `0 0 ${interpolate(frame, [50, 138], [20, 90], clamp)}px rgba(91,140,255,0.75)`,
          }}
        >
          KOREADATALIM.COM
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 34 }}>
        {unis.map((u, i) => {
          const s = spring({ frame: frame - 60 - i * 3, fps, config: { damping: 14 } });
          return (
            <div
              key={u}
              style={{
                width: 104,
                height: 104,
                borderRadius: 52,
                // hanbat and hoseo logos are white, so they get a brand-blue circle
                backgroundColor: u === "hanbat" || u === "hoseo" ? C.brand : C.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: s,
                translate: `0px ${(1 - s) * 60}px`,
              }}
            >
              <Img src={staticFile(`img/unis/${u}.png`)} style={{ width: 72, height: 72, objectFit: "contain" }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Timeline ---------- */

const timing = linearTiming({ durationInFrames: T, easing: Easing.inOut(Easing.cubic) });

export const Promo: React.FC = () => (
  <AbsoluteFill style={{ fontFamily, backgroundColor: C.navy }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook 1" durationInFrames={SCENES[0]}>
        <Hook1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />
      <TransitionSeries.Sequence name="Hook 2" durationInFrames={SCENES[1]}>
        <Hook2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={timing} />
      <TransitionSeries.Sequence name="Brand" durationInFrames={SCENES[2]}>
        <Brand />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />
      <TransitionSeries.Sequence name="Journey" durationInFrames={SCENES[3]}>
        <Journey />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence name="Team" durationInFrames={SCENES[4]}>
        <Team />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />
      <TransitionSeries.Sequence name="Future" durationInFrames={SCENES[5]}>
        <Future />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-top-left" })} timing={timing} />
      <TransitionSeries.Sequence name="Consult" durationInFrames={SCENES[6]}>
        <Consult />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence name="CTA" durationInFrames={SCENES[7]}>
        <CTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
