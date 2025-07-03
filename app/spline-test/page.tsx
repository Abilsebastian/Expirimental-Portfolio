import Spline from '@splinetool/react-spline/next';

export default function SplineTestPage() {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black">
      <div style={{ width: "100vw", height: "100vh" }}>
        <Spline scene="https://prod.spline.design/jS1g8-LUmvrIeXA3/scene.splinecode" />
      </div>
    </main>
  );
}
