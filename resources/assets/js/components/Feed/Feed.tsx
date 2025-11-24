
import React from 'react';
import '../../../css/bootstrap.min.css';
import '../../../css/common.css';
import '../../../css/main.css';
import '../../../css/responsive.css';

// Image imports 
import FeedLeftSidebar from './components/LeftSidebar';
import FeedStories from './components/Stories';
import CreatePostCard from './components/CreatePostCard';
import FeedPostCard from './components/PostCard';
import FeedRightSidebar from './components/RightSidebar';
import FeedNavbar from './components/Navbar';
import FeedLayoutChange from './components/LayoutChange';

import { User } from '../../types';

const Feed: React.FC<{ currentUser: User | null; onLogout: () => void }> = ({ currentUser, onLogout }) => {

    return (
        <div className="_layout _layout_main_wrapper">
            {/* Switching Btn Start */}
            <FeedLayoutChange />
            {/* Switching Btn End */}

            <div className="_main_layout">
                {/* Navbar */}

                <FeedNavbar
                    currentUser={currentUser}
                    onLogout={onLogout}
                />

                {/* Main Layout Structure */}
                <div className="container _custom_container">
                    <div className="_layout_inner_wrap">
                        <div className="row">
                            {/* Left Sidebar */}
                            <FeedLeftSidebar />
                            {/* Left Sidebar end*/}

                            {/* Layout Middle */}
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                <div className="_layout_middle_wrap">
                                    <div className="_layout_middle_inner">
                                        {/* story area */}
                                        <FeedStories />

                                        {/*create post area*/}
                                        <CreatePostCard />

                                        {/* feed area */}
                                        <FeedPostCard />
                                    </div>
                                </div>
                            </div>
                            {/* Layout Middle  end*/}

                            {/* Right Sidebar */}
                            <FeedRightSidebar />
                            {/* Right Sidebar end*/}
                        </div>

                    </div>
                </div>
            </div>
            {/* Main Layout Structure end*/}
        </div>
    );
};

export default Feed;
