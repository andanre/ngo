import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { fetchData } from '../../api/service';

interface Post {
  id: number;
  title: string;
  url: string;
  content: string;
  createdAt: string;
}

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data: Post = await fetchData(`/post/${postId}`);
        setPost(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Failed to fetch post:', error.message);
        } else {
          console.error('Failed to fetch post:', 'An unexpected error occurred');
        }
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const shareUrl = window.location.href; // Gets the current URL to share
  const shareText = encodeURIComponent(`*${post.title}*  \n\n${truncate(post.content, 50)} \n\n- Post Terbaru dari DLH-Tanggamus!`);
  const encodedUrl = encodeURIComponent(shareUrl);

  //facebook
  const loadFacebookSDK = () => {
    if (window.FB) return;  // Check if SDK is already loaded

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 'YOUR_APP_ID', // Replace with your actual Facebook App ID
        cookie: true,  // Enable cookies to allow the server to access the session
        xfbml: true,  // Parse social plugins on this webpage
        version: 'v14.0' // Use whatever the latest version is
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (!fjs) return; // Check if the script tag exists
      if (d.getElementById(id)) return; // Ensure the SDK is not loaded twice
      js = d.createElement(s) as HTMLScriptElement; // Cast to HTMLScriptElement
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode!.insertBefore(js, fjs); // Use the non-null assertion operator !
    }(document, 'script', 'facebook-jssdk'));
  };

  loadFacebookSDK();
  
  const handleFBShare = () => {
    const shareFB = window.location.href;
    const encodedUrlFB = encodeURIComponent(shareFB);

    window.FB.ui({
      method: 'share',
      href: decodeURIComponent(encodedUrlFB), // The URL to share
    }, function (response: { error_message: any; }) {
      if (response && !response.error_message) {
        console.log('Content shared successfully');
      } else {
        console.error('Error while sharing content');
      }
    });
  };

  return (
    <>
      <Container fluid style={{ padding: 0, textAlign: 'center' }}>
        <div className="page-title" style={{
          backgroundColor: '#729762',
          paddingTop: '70px',
          paddingBottom: '25px',
          paddingLeft: '15%',
          paddingRight: '15%',
          color: 'white'
        }}>
          <h1 className="font-alt" style={{
            marginBottom: '20px',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '35px'
          }}>{post.title}</h1>
          <div className="page-header-meta">
            <div className="post-meta">
              <span className="posted-on">
                <Link to="#" style={{ textDecoration: 'none', color: 'white' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    {new Date(post.createdAt).toLocaleDateString()} | <b>Admin-DLH</b>
                  </p>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </Container>

      <Container style={{ margin: '0 auto', maxWidth: '1920px' }}>
        <Container style={{ margin: '0 auto', maxWidth: '1500px' }}>
          <Row className="mt-4">
            <Col md={{ span: 6, offset: 3 }}>
              <img src={post.url} alt={post.title} style={{ width: '100%', height: 'auto' }} />
            </Col>
            <Col md={{ span: 8, offset: 2 }} className="mt-3">
              <p style={{ textAlign: 'justify', fontSize: '13px', lineHeight: '32px' }}
                dangerouslySetInnerHTML={{ __html: post.content }} />
              <Link to="/" className="btn btn-primary mt-3">Back to News</Link>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="mt-5 mb-5" style={{ margin: '0 auto', maxWidth: '1000px' }}>
            <Col xs="auto">
              <span style={{ marginRight: '10px', fontSize: '12px', verticalAlign: 'middle' }}><b>Share:</b></span>
            </Col>
            <Col xs="auto">
              <Button variant="success" href={`https://wa.me/?text=${shareText + '%0A%0A' + encodedUrl}`} target="_blank">
                <FaWhatsapp size={20} color="#fff" />
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handleFBShare} target="_blank">
                <FaFacebook size={20} color="#fff" />
              </Button>
            </Col>
            <Col xs="auto">
              <Button variant="info" href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`} target="_blank">
                <FaTwitter size={20} color="#fff" />
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default PostDetail;

